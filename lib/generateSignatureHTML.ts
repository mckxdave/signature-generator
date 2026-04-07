export interface SignatureData {
  name: string;
  phone: string;
  website: string;
  photoBase64: string;
  logoUrl: string;
}

export function generateSignatureHTML(data: SignatureData): string {
  const { name, phone, website, photoBase64, logoUrl } = data;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Lato, Arial, sans-serif; color: #1A1A1A; border-collapse: collapse;">
  <tr>
    <td style="padding-right: 16px; vertical-align: middle;">
      <img src="${photoBase64}"
           width="80" height="80"
           style="border-radius: 50%; object-fit: cover; display: block; width: 80px; height: 80px;" />
    </td>
    <td style="width: 1px; background-color: #E0E0E0; padding: 0;">&nbsp;</td>
    <td style="padding-left: 16px; vertical-align: top; padding-top: 4px;">
      <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #1A1A1A; line-height: 1.3;">${name.toUpperCase()}</p>
      <p style="margin: 0 0 2px 0; font-size: 13px; color: #555555; line-height: 1.4;">${phone}</p>
      <p style="margin: 0 0 12px 0; font-size: 13px; color: #555555; line-height: 1.4;">${website}</p>
      <img src="${logoUrl}" width="160" alt="Pro Active" style="display: block; width: 160px;" />
    </td>
  </tr>
</table>`;
}
