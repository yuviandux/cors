export default async function handler(req, res) {

       // Allow requests from your Webflow domain
  res.setHeader('Access-Control-Allow-Origin', 'https://app.onecompiler.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const apiUrl = 'https://internal.gearedfinance.com.au/api/partnercalculator/GetGeardCaclculatorRange?calculatorName=Calculator2';

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from external API' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}