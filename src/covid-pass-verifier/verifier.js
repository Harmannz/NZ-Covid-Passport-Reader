'use strict';

// TODO create a function to verify payload from qr code

// eg: NZCP:/1/2KCEVIQEIVVWK6JNGEASNICZAEP2KALYDZSGSZB2O5SWEOTOPJRXALTDN53GSZBRHEXGQZLBNR2GQLTOPICRUYMBTIFAIGTUKBAAUYTWMOSGQQDDN5XHIZLYOSBHQJTIOR2HA4Z2F4XXO53XFZ3TGLTPOJTS6MRQGE4C6Y3SMVSGK3TUNFQWY4ZPOYYXQKTIOR2HA4Z2F4XW46TDOAXGG33WNFSDCOJONBSWC3DUNAXG46RPMNXW45DFPB2HGL3WGFTXMZLSONUW63TFGEXDALRQMR2HS4DFQJ2FMZLSNFTGSYLCNRSUG4TFMRSW45DJMFWG6UDVMJWGSY2DN53GSZCQMFZXG4LDOJSWIZLOORUWC3CTOVRGUZLDOSRWSZ3JOZSW4TTBNVSWISTBMNVWUZTBNVUWY6KOMFWWKZ2TOBQXE4TPO5RWI33CNIYTSNRQFUYDILJRGYDVAYFE6VGU4MCDGK7DHLLYWHVPUS2YIDJOA6Y524TD3AZRM263WTY2BE4DPKIF27WKF3UDNNVSVWRDYIYVJ65IRJJJ6Z25M2DO4YZLBHWFQGVQR5ZLIWEQJOZTS3IQ7JTNCFDX

import {base32} from "rfc4648";

const expectedVersions = new Set(['1']); // currently all versions must be 1

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

    return true
}


const addBase32Padding = (base32InputNoPadding) => {
    var result = base32InputNoPadding;
    while ((result.length % 8) !== 0) {
        result += '='
    }
    return result;
}
