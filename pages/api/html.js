export default async function handler(req, res) {
  try {
    const response = await fetch('https://yuviandux.webflow.io');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch HTML' });
    }

    const html = await response.text();

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching HTML:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}