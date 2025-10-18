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
    slug: "depression-anxiety-management",
    title: "Depression & Anxiety Management",
    subtitle: "Comprehensive psychiatric care for mood and anxiety disorders",
    summary:
      "Evidence-based treatment program combining psychiatric evaluation, psychotherapy, and medication management to address depression and anxiety disorders effectively.",
    description:
      "Our Depression & Anxiety Management program provides comprehensive psychiatric care using a biopsychosocial approach. We combine thorough psychiatric assessment, evidence-based psychotherapy, and when appropriate, medication management to treat depression and anxiety disorders. Our integrated approach addresses biological factors, psychological patterns, and social stressors to achieve lasting recovery.",
    image: "/peaceful-wellness-meditation-nature.jpg",
    duration: "12-16 weeks",
    price: "Contact for pricing",
    addresses: [
      "Major Depressive Disorder",
      "Generalized Anxiety Disorder",
      "Social Anxiety Disorder",
      "Panic Disorder",
      "Persistent Depressive Disorder",
      "Mixed anxiety-depressive disorder",
      "Treatment-resistant depression",
      "Suicidal ideation management",
    ],
    includes: [
      "Comprehensive psychiatric evaluation and diagnosis",
      "Individual psychotherapy sessions (CBT, DBT, or psychodynamic)",
      "Psychiatric medication management and monitoring",
      "Neuropsychological assessment when indicated",
      "Family therapy or couples counseling options",
      "Crisis intervention and safety planning",
      "Ongoing psychiatric follow-up and medication adjustment",
    ],
    benefits: [
      "Significant reduction in depressive and anxiety symptoms",
      "Improved mood stability and emotional regulation",
      "Enhanced quality of life and daily functioning",
      "Better sleep, appetite, and energy levels",
      "Improved relationships and social engagement",
      "Reduced risk of relapse with maintenance treatment",
    ],
    process: [
      {
        step: 1,
        title: "Psychiatric Evaluation",
        description:
          "Comprehensive assessment including mental status examination, diagnostic formulation, and risk assessment",
      },
      {
        step: 2,
        title: "Treatment Planning",
        description:
          "Collaborative development of individualized treatment plan including therapy modality and medication options",
      },
      {
        step: 3,
        title: "Therapy & Medication Management",
        description: "Regular psychotherapy sessions combined with psychiatric medication management and monitoring",
      },
      {
        step: 4,
        title: "Progress Monitoring",
        description: "Ongoing assessment of treatment response with adjustments to therapy or medication as needed",
      },
      {
        step: 5,
        title: "Maintenance & Relapse Prevention",
        description: "Long-term follow-up care and strategies to maintain gains and prevent relapse",
      },
    ],
    whoItsFor: [
      "Individuals with depression or anxiety disorders",
      "Those experiencing suicidal thoughts or self-harm urges",
      "People with treatment-resistant depression",
      "Patients seeking combined therapy and medication management",
      "Anyone struggling with mood or anxiety affecting daily functioning",
    ],
  },
  {
    slug: "bipolar-disorder-management",
    title: "Bipolar Disorder Management",
    subtitle: "Specialized psychiatric care for mood stabilization",
    summary:
      "Specialized program for bipolar disorder management combining mood stabilizing medications, psychoeducation, and psychotherapy to achieve stability and prevent episodes.",
    description:
      "Our Bipolar Disorder Management program provides specialized psychiatric care for individuals with bipolar I, bipolar II, and cyclothymia. We focus on mood stabilization through appropriate medication management, psychoeducation about the condition, and evidence-based psychotherapy. Our approach helps patients recognize early warning signs, manage triggers, and maintain stability while optimizing quality of life.",
    image: "/stress-management-sleep-optimization-wellness.jpg",
    duration: "Ongoing maintenance",
    price: "Contact for pricing",
    addresses: [
      "Bipolar I Disorder",
      "Bipolar II Disorder",
      "Cyclothymia",
      "Rapid cycling bipolar disorder",
      "Mixed episodes",
      "Manic episodes with psychotic features",
      "Depressive episodes in bipolar disorder",
      "Medication-resistant bipolar disorder",
    ],
    includes: [
      "Comprehensive bipolar disorder assessment and diagnosis",
      "Mood stabilizing medication management",
      "Psychoeducation about bipolar disorder and triggers",
      "Individual psychotherapy (CBT, DBT, or interpersonal therapy)",
      "Family psychoeducation and support",
      "Sleep and lifestyle management strategies",
      "Regular mood monitoring and medication adjustment",
      "Crisis planning and emergency protocols",
    ],
    benefits: [
      "Improved mood stability and reduced episode frequency",
      "Better management of manic and depressive symptoms",
      "Enhanced medication compliance and effectiveness",
      "Improved relationships and social functioning",
      "Better sleep and energy regulation",
      "Reduced hospitalizations and crisis episodes",
    ],
    process: [
      {
        step: 1,
        title: "Diagnostic Assessment",
        description: "Thorough evaluation of mood history, episode patterns, and family psychiatric history",
      },
      {
        step: 2,
        title: "Medication Optimization",
        description: "Selection and titration of appropriate mood stabilizers and adjunctive medications",
      },
      {
        step: 3,
        title: "Psychoeducation & Therapy",
        description: "Patient and family education about bipolar disorder combined with evidence-based psychotherapy",
      },
      {
        step: 4,
        title: "Lifestyle Management",
        description: "Development of strategies for sleep hygiene, stress management, and trigger avoidance",
      },
      {
        step: 5,
        title: "Long-Term Maintenance",
        description: "Ongoing psychiatric management with regular monitoring and adjustment of treatment as needed",
      },
    ],
    whoItsFor: [
      "Individuals diagnosed with bipolar disorder",
      "Those experiencing mood episodes despite current treatment",
      "People seeking medication optimization",
      "Patients wanting psychoeducation and coping strategies",
      "Anyone with bipolar disorder seeking comprehensive psychiatric care",
    ],
  },
  {
    slug: "psychosis-schizophrenia-care",
    title: "Psychosis & Schizophrenia Care",
    subtitle: "Comprehensive treatment for psychotic disorders",
    summary:
      "Specialized psychiatric program for psychotic disorders including schizophrenia, schizoaffective disorder, and brief psychotic episodes with antipsychotic medication and psychosocial support.",
    description:
      "Our Psychosis & Schizophrenia Care program provides comprehensive psychiatric treatment for individuals experiencing psychotic symptoms. We combine antipsychotic medication management with psychosocial interventions, cognitive remediation, and family support. Our goal is symptom management, functional recovery, and community integration while minimizing medication side effects.",
    image: "/doctor-consultation-functional-medicine.jpg",
    duration: "Ongoing maintenance",
    price: "Contact for pricing",
    addresses: [
      "Schizophrenia spectrum disorders",
      "Schizoaffective Disorder",
      "Brief Psychotic Disorder",
      "Substance-induced psychosis",
      "Psychosis due to medical conditions",
      "First-episode psychosis",
      "Treatment-resistant psychosis",
      "Negative symptoms and cognitive impairment",
    ],
    includes: [
      "Comprehensive psychotic disorder assessment",
      "Antipsychotic medication selection and management",
      "Regular monitoring for medication side effects",
      "Individual psychotherapy and coping strategies",
      "Cognitive remediation and functional training",
      "Family psychoeducation and support",
      "Vocational and social rehabilitation support",
      "Crisis intervention and hospitalization prevention",
    ],
    benefits: [
      "Reduction in hallucinations and delusions",
      "Improved reality testing and insight",
      "Better medication tolerance and compliance",
      "Enhanced social and vocational functioning",
      "Improved quality of life and independence",
      "Reduced hospitalizations and crisis episodes",
    ],
    process: [
      {
        step: 1,
        title: "Psychotic Disorder Assessment",
        description: "Comprehensive evaluation of psychotic symptoms, medical history, and functional impairment",
      },
      {
        step: 2,
        title: "Antipsychotic Medication Management",
        description: "Selection of appropriate antipsychotic with careful monitoring for efficacy and side effects",
      },
      {
        step: 3,
        title: "Psychosocial Interventions",
        description: "Individual therapy, cognitive remediation, and coping strategies for symptom management",
      },
      {
        step: 4,
        title: "Family Support & Education",
        description: "Family psychoeducation about psychotic disorders and strategies for supporting recovery",
      },
      {
        step: 5,
        title: "Functional Recovery",
        description:
          "Support for vocational, educational, and social reintegration with ongoing psychiatric management",
      },
    ],
    whoItsFor: [
      "Individuals experiencing psychotic symptoms",
      "Those diagnosed with schizophrenia or schizoaffective disorder",
      "People with first-episode psychosis",
      "Patients with treatment-resistant psychosis",
      "Anyone seeking comprehensive psychotic disorder management",
    ],
  },
  {
    slug: "trauma-ptsd-treatment",
    title: "Trauma & PTSD Treatment",
    subtitle: "Specialized care for trauma and post-traumatic stress",
    summary:
      "Evidence-based trauma treatment program using trauma-focused psychotherapy, EMDR, and psychiatric support to process trauma and reduce PTSD symptoms.",
    description:
      "Our Trauma & PTSD Treatment program provides specialized psychiatric care for individuals with post-traumatic stress disorder and complex trauma. We utilize evidence-based trauma therapies including Cognitive Processing Therapy, Prolonged Exposure, and EMDR combined with psychiatric support. Our approach helps patients process traumatic memories, reduce hyperarousal, and rebuild a sense of safety and control.",
    image: "/hormonal-balance-wellness-natural-health.jpg",
    duration: "16-20 weeks",
    price: "Contact for pricing",
    addresses: [
      "Post-Traumatic Stress Disorder (PTSD)",
      "Complex PTSD (C-PTSD)",
      "Acute Stress Disorder",
      "Trauma-related anxiety and hypervigilance",
      "Trauma-related depression and dissociation",
      "Childhood trauma and abuse",
      "Combat-related PTSD",
      "Grief and bereavement complications",
    ],
    includes: [
      "Trauma-focused psychiatric assessment",
      "Trauma-focused cognitive behavioral therapy (TF-CBT)",
      "EMDR (Eye Movement Desensitization and Reprocessing)",
      "Psychiatric medication management for PTSD symptoms",
      "Grounding and coping skills training",
      "Somatic therapy and body-based interventions",
      "Family therapy when appropriate",
      "Ongoing psychiatric support and monitoring",
    ],
    benefits: [
      "Significant reduction in PTSD symptoms",
      "Decreased flashbacks, nightmares, and intrusive thoughts",
      "Reduced hyperarousal and anxiety",
      "Improved emotional regulation and coping",
      "Enhanced sense of safety and control",
      "Better sleep and daily functioning",
    ],
    process: [
      {
        step: 1,
        title: "Trauma Assessment",
        description: "Comprehensive evaluation of trauma history, PTSD symptoms, and current functioning",
      },
      {
        step: 2,
        title: "Safety & Stabilization",
        description: "Establishment of safety, grounding techniques, and coping skills before trauma processing",
      },
      {
        step: 3,
        title: "Trauma Processing",
        description:
          "Evidence-based trauma therapy (TF-CBT, Prolonged Exposure, or EMDR) to process traumatic memories",
      },
      {
        step: 4,
        title: "Integration & Meaning-Making",
        description: "Integration of processed trauma and development of new meaning and perspective",
      },
      {
        step: 5,
        title: "Relapse Prevention & Maintenance",
        description: "Development of long-term coping strategies and ongoing support to maintain gains",
      },
    ],
    whoItsFor: [
      "Individuals with PTSD or complex trauma",
      "Trauma survivors seeking specialized treatment",
      "Those with trauma-related anxiety or depression",
      "People experiencing flashbacks or nightmares",
      "Anyone seeking to process and heal from traumatic experiences",
    ],
  },
]
