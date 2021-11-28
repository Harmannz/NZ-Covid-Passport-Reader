import {base32} from "rfc4648";
const cbor = require('cbor-web')
const expectedVersions = new Set(['1']); // currently all versions must be 1

const expectedIssuers = new Set([
    "did:web:nzcp.identity.health.nz",
    "did:web:nzcp.covid19.health.nz" // This is temporary -> remove. Ideally we store this in an environment config. Lets use Convict!!!
])
/**
 *
 * @param payload string
 */
export function covidCodeVerifier(payload) {
    // check stats with

    if (!payload.startsWith('NZCP:/')) {
        return "does not start with nzcp" // TODO: handle errors
    }

    // is using lastIndexOf here safe?
    const versionIdentifier = payload.substring(6, payload.lastIndexOf('/'))
    if (!expectedVersions.has(versionIdentifier)) {
        return "version mismatch"
    }

    // decode the base64 portion of the above payload
    let base32Portion = payload.substring(payload.lastIndexOf('/') + 1);

    // add back padding if required: function copied from https://nzcp.covid19.health.nz/#steps-to-verify-a-new-zealand-covid-pass
    // TODO: function should be tested
    base32Portion = addBase32Padding(base32Portion)

    const parsedArray = base32.parse(base32Portion);


    // cbor decode
    // decode as COSE_Sign1
    const decodedCOSEStructures = cbor.decodeAllSync(parsedArray)

    //TODO: verify decodedCoseStructures is an array of one element
    const decodedCOSEStructure = decodedCOSEStructures[0];
    const decodedCWTProtectedHeaders = cbor.decodeAllSync(decodedCOSEStructure.value[0]);
    // TODO: verify headers contains one element that is a map with two entries is two

    // kid: This header MUST be present in the protected header section of the COSE_Sign1 structure.
    // The claim key of 4 is used to identify this claim. This value MUST be encoded as a Major Type 3 string as defined by [RFC7049].
    const kidValue = decodedCWTProtectedHeaders[0].get(4);
    // alg: Algorithm as per Cryptographic Digital Signature Algorithm. The claim key of 1 is used to identify this claim.
    // It MUST be present in the protected header section of the COSE_Sign1 structure and its claim value MUST be set to
    // the value corresponding to ES256 algorithm registration, which is the numeric value of -7 as per IANA registry.
    const algValue = decodedCWTProtectedHeaders[0].get(1);
    // verify this is 7
    if (algValue != -7) {
        return 'algorithm mismatch';
    }

    const decodedCWTPayload = cbor.decodeAllSync(decodedCOSEStructure.value[2]);

    // extract payload information
    const cwtTokenID = decodedCWTPayload[0].get(7);

    const issuer = decodedCWTPayload[0].get(1);
    const notBefore = decodedCWTPayload[0].get(5);
    const expiry = decodedCWTPayload[0].get(4);
    const verifiableCredential = decodedCWTPayload[0].get('vc');

    if (!expectedIssuers.has(issuer)) {
        return "incorrect issuer";
    }
    return true
}


const addBase32Padding = (base32InputNoPadding) => {
    var result = base32InputNoPadding;
    while ((result.length % 8) !== 0) {
        result += '='
    }
    return result;
}
