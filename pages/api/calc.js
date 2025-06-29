
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'], // Customize as needed
  origin: '*', // Or specify origin: 'https://example.com'
});

// Helper method to wait for the middleware to run
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });
}

export default async function handler(req, res) {

  // Run the middleware
  await runMiddleware(req, res, cors);

   // Allow requests from your Webflow domain
  res.setHeader('Access-Control-Allow-Origin', 'https://app.onecompiler.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { P, years, repaymentType } = req.query;

  if (!P || !years || !repaymentType) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const externalApiUrl = `https://internal.gearedfinance.com.au/api/partnercalculator/GetGeardCaclculatorAmount?CalculatorName=TestCal&Amount=${P}&RepaymentTerm=${years}&RepaymentType=${repaymentType}&PartnerAPIKey=6723f162-a749-4bee-9065-565671362656`;

  try {
    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}