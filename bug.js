```javascript
// pages/api/data.js
export default function handler(req, res) {
  // Simulate an API call that might sometimes fail
  if (Math.random() < 0.5) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.status(200).json({ data: 'Success!' });
  }
}
```

```javascript
// pages/index.js
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR('/api/data');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
```