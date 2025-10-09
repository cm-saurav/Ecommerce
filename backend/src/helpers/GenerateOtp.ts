
export const otpGenerator = ()=>{
    const randomFloat = Math.random();
    const scaledVal = randomFloat * 1000000; // generating 6 digit expand range
    const otpNum = Math.floor(scaledVal);
    const otpString = String(otpNum).padStart(6,'0'); //trailing 0 at starting 
    // console.log('otpppppppppppppppp',otpString)

    return otpString;

}