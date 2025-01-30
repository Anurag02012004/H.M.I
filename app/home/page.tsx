"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

// Custom SVG components
const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// Simple AI response function
const getAIResponse = (question: string) => {
  const responses = {
    default:
      "I'm sorry, I don't have enough information to answer that question. Can you please provide more details or ask something related to our hyperlocal influencer marketing platform?",
    influencer:
      "Our platform connects local businesses with micro-influencers in their immediate vicinity. We use AI-powered matching to ensure the best fit for your brand and target audience.",
    campaign:
      "Creating a campaign is easy! Just click on the 'Create Campaign' button, fill in your campaign details, and our AI will help match you with suitable local influencers.",
    pricing:
      "We offer flexible pricing options tailored for local businesses. You can start small and scale as your business grows. For specific pricing, please contact our sales team.",
    analytics:
      "Our platform provides detailed analytics focused on local metrics. You can track your campaign performance, engagement rates, and ROI in real-time.",
  }

  const lowercaseQuestion = question.toLowerCase()
  if (lowercaseQuestion.includes("influencer")) return responses.influencer
  if (lowercaseQuestion.includes("campaign")) return responses.campaign
  if (lowercaseQuestion.includes("price") || lowercaseQuestion.includes("cost")) return responses.pricing
  if (lowercaseQuestion.includes("analytics") || lowercaseQuestion.includes("metrics")) return responses.analytics
  return responses.default
}

type Message = {
  text: string
  isUser: boolean
}

export default function Home() {
  const router = useRouter()
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ text: "Hello! How can I assist you today?", isUser: false }])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleFindInfluencer = () => {
    router.push("/discover")
  }

  const handleCreateCampaign = () => {
    router.push("/campaign/create")
  }

  const toggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isUser: true }])

    // Get AI response
    const aiResponse = getAIResponse(inputText)

    // Add AI response after a short delay to simulate processing
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }])
    }, 500)

    setInputText("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef]) //Corrected useEffect dependency

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <header className="bg-gray-800 shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-semibold mb-4 md:mb-0">
              <Link href="/home">H.M.I.</Link>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Link href="/discover" className="hover:text-blue-400">
                Discover Influencers
              </Link>
              <Link href="/campaign/create" className="hover:text-blue-400">
                Create Campaign
              </Link>
              <Link href="/" className="hover:text-blue-400">
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Empowering Small Businesses with Hyperlocal Influencer Marketing</h1>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleFindInfluencer}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
            >
              Find Influencers
            </button>
            <button
              onClick={handleCreateCampaign}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto"
            >
              Create Campaign
            </button>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="font-semibold text-xl mb-2">AI-Powered Matching</h3>
              <p>
                Our advanced AI algorithms find the perfect local influencers for your brand, ensuring maximum impact
                for your campaigns
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold text-xl mb-2">AI Brand Assistance</h3>
              <p>
                Get personalized AI recommendations to optimize your campaign strategy and target the right local
                audience
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="font-semibold text-xl mb-2">AI Influencer Insights</h3>
              <p>
                Influencers receive AI-driven insights to improve content and engage better with local brands and
                audiences
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Hyperlocal Influencer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">📍</div>
              <h3 className="font-semibold text-xl mb-2">Hyperlocal Focus</h3>
              <p>Connect with influencers and brands in your immediate vicinity for maximum local impact</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold text-xl mb-2">Affordable Campaigns</h3>
              <p>Start small and scale as you grow with our flexible pricing options tailored for local businesses</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-semibold text-xl mb-2">Detailed Analytics</h3>
              <p>Track your campaign performance with comprehensive, real-time analytics focused on local metrics</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">
                "The AI-powered matching on this platform is incredible! We've seen a significant increase in foot
                traffic and online engagement since partnering with local influencers through Hyperlocal Influencer."
              </p>
              <p className="font-semibold">- Sarah Johnson, Owner of Bloom Café</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">
                "As an influencer, the AI insights have been game-changing. I've connected with amazing local brands and
                significantly grown my following in my community thanks to Hyperlocal Influencer."
              </p>
              <p className="font-semibold">- Mike Chen, Lifestyle Micro-Influencer</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              Hyperlocal Influencer is a cutting-edge platform designed to bridge the gap between small businesses and
              micro-influencers in their immediate vicinity. We believe in the power of local communities and the impact
              of authentic, relatable content.
            </p>
            <p className="mb-4">
              Our mission is to democratize influencer marketing, making it accessible and effective for businesses of
              all sizes. By focusing on hyperlocal connections and leveraging AI technology, we help brands create
              meaningful partnerships that resonate with their target audience right in their neighborhood.
            </p>
            <p>
              Founded by a team of marketing experts and AI enthusiasts, Hyperlocal Influencer uses advanced artificial
              intelligence and data analytics to ensure the perfect match between local businesses and nearby
              influencers. We're committed to fostering an ecosystem where local businesses thrive and influencers can
              monetize their passion within their community.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              {/* <Link href="/about" className="hover:text-gray-300">
                About Us
              </Link> */}
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.772-1.153c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <button
        onClick={toggleAssistant}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-200 z-50"
        aria-label="Open AI Assistant"
      >
        <MessageCircleIcon />
      </button>

      {/* AI Assistant Dialog */}
      {isAssistantOpen && (
        <div className="fixed bottom-20 right-4 bg-gray-800 rounded-lg shadow-xl p-4 w-80 z-50 max-h-[70vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
            <button onClick={toggleAssistant} className="text-gray-400 hover:text-white">
              <XIcon />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.isUser ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
                } max-w-[80%]`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className="flex-grow px-3 py-2 bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

