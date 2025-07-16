/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags,flag,cca2,cca3', {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch countries');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid country data');
  return data
    .map((c: any) => ({
      name: c.name.common,
      callingCode: c.idd?.root && c.idd.suffixes ? `${c.idd.root}${c.idd.suffixes[0]}` : '',
      flag: c.flag || c.flags?.emoji || c.flags?.svg || '',
      code: c.cca2 || c.cca3 || c.name.common, // fallback to name if code missing
    }))
    .filter((c: any) => c.callingCode);
}

export async function sendOtp() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, otp: '123456' };
}

export async function verifyOtp(otp: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (otp === '123456') return true;
  throw new Error('Invalid OTP');
}
