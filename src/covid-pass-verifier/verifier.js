'use strict';

import {base32} from "rfc4648";
const cbor = require('cbor-web')
const expectedVersions = new Set(['1']); // currently all versions must be 1

/**
 *
 * @param payload string
 */
export async function covidCodeVerifier(payload) {
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
    const result = await cbor.decodeAll(parsedArray)


    return true
}


const addBase32Padding = (base32InputNoPadding) => {
    var result = base32InputNoPadding;
    while ((result.length % 8) !== 0) {
        result += '='
    }
    return result;
}
