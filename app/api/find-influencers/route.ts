import { NextResponse } from 'next/server';

// This is a mock database of influencers. In a real application, you would fetch this data from a database.
const influencers = [
  { id: 1, name: "Alice Johnson", location: "New York", followers: 50000, niche: "Fashion" },
  { id: 2, name: "Bob Smith", location: "Los Angeles", followers: 75000, niche: "Fitness" },
  { id: 3, name: "Charlie Brown", location: "Chicago", followers: 30000, niche: "Food" },
  { id: 4, name: "Diana Miller", location: "Miami", followers: 100000, niche: "Travel" },
  { id: 5, name: "Eva Williams", location: "San Francisco", followers: 60000, niche: "Tech" },
];

export async function POST(request: Request) {
  const { brandLocation } = await request.json();

  // In a real application, you would use a more sophisticated algorithm to match influencers based on location proximity
  const nearbyInfluencers = influencers.filter(influencer => 
    influencer.location.toLowerCase().includes(brandLocation.toLowerCase())
  );

  return NextResponse.json({ influencers: nearbyInfluencers });
}
