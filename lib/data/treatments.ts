export interface Treatment {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  duration: string
  price: string
  benefits: string[]
  process: {
    step: number
    title: string
    description: string
  }[]
  whoItsFor: string[]
}

export const treatments: Treatment[] = [
  {
    slug: "gut-health-reset",
    title: "Gut Health Reset",
    subtitle: "Restore digestive balance and optimize nutrient absorption",
    description:
      "Our comprehensive Gut Health Reset program addresses the root causes of digestive dysfunction, from bloating and IBS to food sensitivities and inflammation. Using advanced testing and personalized protocols, we help restore your gut microbiome and heal your digestive system.",
    image: "/placeholder.jpg",
    duration: "2 weeks",
    price: "$499",
    benefits: ["Improved digestion", "Enhanced nutrient absorption", "Reduced inflammation"],
    process: [
      { step: 1, title: "Initial Consultation", description: "Discuss your symptoms and health goals" },
      { step: 2, title: "Testing", description: "Run advanced tests to identify gut issues" },
      { step: 3, title: "Protocol Development", description: "Create a personalized treatment plan" },
      { step: 4, title: "Implementation", description: "Follow the plan for 2 weeks" },
      { step: 5, title: "Follow-Up", description: "Review progress and adjust plan as needed" },
    ],
    whoItsFor: [
      "People with digestive issues",
      "Individuals seeking better nutrient absorption",
      "Those looking to reduce inflammation",
    ],
  },
  // /** rest of code here **/
]
