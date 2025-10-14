export interface Treatment {
  slug: string
  title: string
  subtitle: string
  summary: string
  description: string
  image: string
  duration: string
  price: string
  addresses: string[]
  includes: string[]
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
    summary:
      "Comprehensive program to heal your digestive system, reduce inflammation, and restore optimal gut function through advanced testing and personalized protocols.",
    description:
      "Our comprehensive Gut Health Reset program addresses the root causes of digestive dysfunction, from bloating and IBS to food sensitivities and inflammation. Using advanced testing and personalized protocols, we help restore your gut microbiome and heal your digestive system. This program combines cutting-edge diagnostics with evidence-based natural therapies to identify and eliminate triggers while rebuilding your gut health from the ground up.",
    image: "/gut-health-digestive-wellness-functional-medicine.jpg",
    duration: "12-16 weeks",
    price: "Contact for pricing",
    addresses: [
      "Chronic bloating and gas",
      "Irritable Bowel Syndrome (IBS)",
      "Food sensitivities and intolerances",
      "Leaky gut syndrome",
      "Chronic constipation or diarrhea",
      "Inflammatory bowel conditions",
      "Poor nutrient absorption",
      "Systemic inflammation",
    ],
    includes: [
      "Comprehensive stool analysis and microbiome testing",
      "Food sensitivity testing panel",
      "Personalized elimination diet protocol",
      "Targeted probiotic and supplement recommendations",
      "Weekly progress monitoring and adjustments",
      "Gut-healing meal plans and recipes",
      "Ongoing email and messaging support",
    ],
    benefits: [
      "Improved digestion and reduced bloating",
      "Enhanced nutrient absorption and energy levels",
      "Reduced inflammation throughout the body",
      "Elimination of food sensitivities and intolerances",
      "Restored gut microbiome balance",
      "Better immune system function",
    ],
    process: [
      {
        step: 1,
        title: "Comprehensive Assessment",
        description:
          "Detailed health history review and symptom analysis to understand your unique digestive challenges",
      },
      {
        step: 2,
        title: "Advanced Diagnostic Testing",
        description:
          "Comprehensive stool analysis, food sensitivity testing, and microbiome mapping to identify root causes",
      },
      {
        step: 3,
        title: "Personalized Protocol Development",
        description:
          "Custom treatment plan including dietary modifications, targeted supplementation, and lifestyle interventions",
      },
      {
        step: 4,
        title: "Implementation & Support",
        description: "Guided program implementation with weekly check-ins and adjustments based on your progress",
      },
      {
        step: 5,
        title: "Maintenance & Optimization",
        description: "Long-term strategies to maintain gut health and prevent future digestive issues",
      },
    ],
    whoItsFor: [
      "Individuals with chronic digestive issues (IBS, bloating, constipation, diarrhea)",
      "People with food sensitivities or suspected leaky gut",
      "Those seeking to optimize nutrient absorption and energy",
      "Anyone looking to reduce systemic inflammation",
      "Patients with autoimmune conditions linked to gut health",
    ],
  },
  {
    slug: "hormonal-balance",
    title: "Hormonal Balance Program",
    subtitle: "Restore hormonal harmony and reclaim your vitality",
    summary:
      "Targeted program to identify and correct hormonal imbalances affecting energy, mood, weight, and overall wellbeing through comprehensive testing and natural interventions.",
    description:
      "Our Hormonal Balance Program takes a comprehensive approach to identifying and correcting hormonal imbalances that affect every aspect of your health. Whether you're struggling with thyroid dysfunction, adrenal fatigue, sex hormone imbalances, or metabolic issues, we use advanced hormone testing and personalized protocols to restore your body's natural balance. This program addresses the root causes of hormonal disruption including stress, nutrition, toxin exposure, and lifestyle factors.",
    image: "/hormonal-balance-wellness-natural-health.jpg",
    duration: "12-16 weeks",
    price: "Contact for pricing",
    addresses: [
      "Thyroid dysfunction (hypo/hyperthyroidism)",
      "Adrenal fatigue and cortisol imbalances",
      "Sex hormone imbalances (estrogen, progesterone, testosterone)",
      "PMS and menstrual irregularities",
      "Menopausal and perimenopausal symptoms",
      "PCOS and fertility challenges",
      "Low libido and sexual dysfunction",
      "Unexplained weight gain or difficulty losing weight",
    ],
    includes: [
      "Comprehensive hormone panel testing",
      "Thyroid function assessment (TSH, T3, T4, antibodies)",
      "Cortisol rhythm analysis",
      "Sex hormone testing",
      "Personalized nutrition and supplement protocol",
      "Stress management and lifestyle coaching",
      "Bi-weekly progress consultations",
      "Follow-up testing to track improvements",
    ],
    benefits: [
      "Balanced energy levels throughout the day",
      "Improved mood stability and mental clarity",
      "Better sleep quality and recovery",
      "Healthy weight management and metabolism",
      "Enhanced libido and reproductive health",
      "Reduced PMS and menopausal symptoms",
    ],
    process: [
      {
        step: 1,
        title: "Hormonal Health Assessment",
        description:
          "In-depth evaluation of symptoms, health history, and lifestyle factors affecting hormonal balance",
      },
      {
        step: 2,
        title: "Comprehensive Hormone Testing",
        description: "Advanced testing including thyroid panel, sex hormones, cortisol patterns, and metabolic markers",
      },
      {
        step: 3,
        title: "Root Cause Analysis",
        description:
          "Identify underlying factors contributing to hormonal imbalances including stress, nutrition, and toxins",
      },
      {
        step: 4,
        title: "Personalized Treatment Protocol",
        description: "Custom plan with targeted nutrition, supplements, stress management, and lifestyle modifications",
      },
      {
        step: 5,
        title: "Ongoing Monitoring & Adjustment",
        description: "Regular follow-ups with repeat testing to track progress and optimize your protocol",
      },
    ],
    whoItsFor: [
      "Women experiencing PMS, irregular cycles, or menopausal symptoms",
      "Men with low testosterone or energy issues",
      "Individuals with thyroid dysfunction or metabolic concerns",
      "Those struggling with unexplained weight gain or difficulty losing weight",
      "People experiencing chronic fatigue, mood swings, or sleep disturbances",
    ],
  },
  {
    slug: "chronic-fatigue-recovery",
    title: "Chronic Fatigue Recovery",
    subtitle: "Reclaim your energy and vitality",
    summary:
      "Comprehensive program to identify and address the root causes of persistent fatigue, restoring your natural energy and resilience through targeted interventions.",
    description:
      "Our Chronic Fatigue Recovery program is designed for individuals who have been struggling with persistent exhaustion that doesn't improve with rest. We investigate the multiple factors that can contribute to chronic fatigue including mitochondrial dysfunction, hormonal imbalances, nutrient deficiencies, chronic infections, and toxic burden. Through comprehensive testing and personalized protocols, we address each contributing factor to help you reclaim your energy and vitality.",
    image: "/chronic-fatigue-recovery-energy-restoration.jpg",
    duration: "16-20 weeks",
    price: "Contact for pricing",
    addresses: [
      "Persistent exhaustion despite adequate rest",
      "Chronic Fatigue Syndrome (CFS/ME)",
      "Post-viral fatigue and long COVID",
      "Mitochondrial dysfunction",
      "Fibromyalgia-related fatigue",
      "Adrenal exhaustion and burnout",
      "Brain fog and cognitive fatigue",
      "Exercise intolerance and post-exertional malaise",
    ],
    includes: [
      "Comprehensive fatigue assessment and health history",
      "Mitochondrial function testing",
      "Complete hormone panel",
      "Nutrient deficiency screening",
      "Immune system and infection markers",
      "Personalized energy restoration protocol",
      "Mitochondrial support supplementation",
      "Weekly monitoring and protocol adjustments",
    ],
    benefits: [
      "Restored natural energy and stamina",
      "Improved mental clarity and focus",
      "Better stress resilience and recovery",
      "Enhanced physical performance and endurance",
      "Improved sleep quality and restoration",
      "Greater overall sense of wellbeing",
    ],
    process: [
      {
        step: 1,
        title: "Comprehensive Fatigue Assessment",
        description:
          "Detailed evaluation of fatigue patterns, triggers, and impact on daily life along with complete health history",
      },
      {
        step: 2,
        title: "Multi-System Diagnostic Testing",
        description:
          "Extensive testing including mitochondrial function, hormones, nutrients, immune markers, and potential infections",
      },
      {
        step: 3,
        title: "Root Cause Identification",
        description: "Analyze test results to identify all contributing factors to your chronic fatigue",
      },
      {
        step: 4,
        title: "Integrated Treatment Protocol",
        description:
          "Comprehensive plan addressing mitochondrial support, hormonal balance, nutrient repletion, and lifestyle optimization",
      },
      {
        step: 5,
        title: "Progressive Recovery Monitoring",
        description:
          "Regular assessments and protocol adjustments to ensure steady progress toward full energy restoration",
      },
    ],
    whoItsFor: [
      "Individuals with persistent fatigue lasting more than 6 months",
      "Those diagnosed with Chronic Fatigue Syndrome or fibromyalgia",
      "People who wake up tired despite adequate sleep",
      "Individuals with post-viral fatigue or long COVID symptoms",
      "Anyone whose fatigue significantly impacts daily functioning and quality of life",
    ],
  },
  {
    slug: "stress-sleep-optimization",
    title: "Stress & Sleep Optimization",
    subtitle: "Master stress resilience and restorative sleep",
    summary:
      "A holistic program to break the cycle of chronic stress and poor sleep, in order to restore your body's natural rhythms, sleep schedules and building lasting resilience.",
    description:
      "Our Stress & Sleep Optimization program addresses the interconnected challenges of chronic stress and sleep disturbances that affect millions. We recognize that poor sleep increases stress, and chronic stress disrupts sleep, creating a vicious cycle. Through comprehensive assessment of your stress response, sleep architecture, and circadian rhythms, we develop personalized protocols to restore balance. This program combines advanced testing, targeted supplementation, lifestyle modifications, and stress management techniques to help you achieve restorative sleep and build lasting stress resilience.",
    image: "/stress-management-sleep-optimization-wellness.jpg",
    duration: "12-14 weeks",
    price: "Contact for pricing",
    addresses: [
      "Chronic insomnia and difficulty falling asleep",
      "Frequent night waking and poor sleep quality",
      "Racing thoughts and bedtime anxiety",
      "Chronic stress and overwhelm",
      "Burnout and emotional exhaustion",
      "Disrupted circadian rhythms",
      "Morning fatigue despite sleeping",
      "Stress-related health issues",
    ],
    includes: [
      "Sleep quality and pattern assessment",
      "Cortisol rhythm testing",
      "Neurotransmitter analysis",
      "Personalized sleep optimization protocol",
      "Stress management techniques and tools",
      "Targeted supplements for sleep and stress",
      "Circadian rhythm restoration strategies",
      "Weekly coaching and support sessions",
    ],
    benefits: [
      "Deeper, more restorative sleep",
      "Improved stress resilience and emotional balance",
      "Better energy and mental clarity during the day",
      "Reduced anxiety and racing thoughts",
      "Balanced cortisol and stress hormone patterns",
      "Enhanced overall health and longevity",
    ],
    process: [
      {
        step: 1,
        title: "Stress & Sleep Assessment",
        description: "Comprehensive evaluation of sleep patterns, stress triggers, and current coping mechanisms",
      },
      {
        step: 2,
        title: "Physiological Testing",
        description:
          "Advanced testing including cortisol rhythm analysis, sleep quality markers, and neurotransmitter assessment",
      },
      {
        step: 3,
        title: "Personalized Protocol Design",
        description:
          "Custom plan addressing sleep hygiene, stress management, circadian rhythm optimization, and targeted supplementation",
      },
      {
        step: 4,
        title: "Implementation & Skill Building",
        description:
          "Guided implementation with stress management techniques, sleep optimization strategies, and lifestyle modifications",
      },
      {
        step: 5,
        title: "Long-Term Resilience Building",
        description:
          "Develop sustainable practices and tools for maintaining optimal stress response and sleep quality",
      },
    ],
    whoItsFor: [
      "Individuals with chronic insomnia or poor sleep quality",
      "Those experiencing high stress levels or burnout",
      "People with anxiety affecting sleep and daily functioning",
      "Shift workers or those with disrupted circadian rhythms",
      "Anyone seeking to optimize their stress resilience and sleep for better health",
    ],
  },
]
