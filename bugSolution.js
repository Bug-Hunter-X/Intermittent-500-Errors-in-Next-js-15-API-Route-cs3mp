```javascript
// pages/api/data.js
import { withSentry } from '@sentry/nextjs';

const handler = (req, res) => {
  try {
    // Simulate an API call that might sometimes fail
    if (Math.random() < 0.5) {
      throw new Error('Simulated API Error');
    } else {
      res.status(200).json({ data: 'Success!' });
    }
  } catch (error) {
    console.error('API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default withSentry(handler, { 
  // Optionally add more config here, like tracesSampleRate
});

```

```javascript
// pages/index.js
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR('/api/data', {
    onError: (err) => {
       console.error('SWR Error:', err);
    }
  });

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>loading...</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
```