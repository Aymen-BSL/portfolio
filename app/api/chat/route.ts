import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

// Create a Google AI instance with custom API key name
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Comprehensive query to fetch all portfolio data
const PORTFOLIO_DATA_QUERY = defineQuery(`*[_id == "singleton-profile"][0] {
  firstName,
  lastName,
  headline,
  shortBio,
  fullBio,
  email,
  phone,
  location,
  yearsOfExperience,
  availability,
  socialLinks,
  "skills": *[_type == "skill"] | order(proficiencyLevel desc) {
    name,
    category,
    proficiencyLevel,
    yearsExperience
  }[0...20],
  "experience": *[_type == "experience"] | order(startDate desc) {
    jobTitle,
    company,
    location,
    employmentType,
    startDate,
    endDate,
    responsibilities,
    achievements
  },
  "projects": *[_type == "showcaseProject"] | order(_createdAt desc) {
    title,
    des,
    img,
    iconLists,
    link
  }[0...10],
  "education": *[_type == "education"] | order(endDate desc) {
    degree,
    fieldOfStudy,
    institution,
    location,
    startDate,
    endDate,
    gpa,
    achievements
  },
  "certifications": *[_type == "certification"] | order(issueDate desc) {
    name,
    issuingOrganization,
    issueDate,
    expiryDate,
    credentialId,
    description
  }[0...10],
  "services": *[_type == "service"] | order(featured desc) {
    title,
    description,
    features,
    pricing,
    timeline
  }
}`);

// Helper function to format portfolio data for system prompt
function formatPortfolioData(data: any): string {
  if (!data) return "No portfolio data available.";

  let context = "";

  // Profile Information
  context += `## ABOUT ME\n`;
  context += `Name: ${data.firstName} ${data.lastName}\n`;
  context += `Role: ${data.headline || "Not specified"}\n`;
  context += `Experience: ${data.yearsOfExperience || "Not specified"} years\n`;
  context += `Location: ${data.location || "Not specified"}\n`;
  context += `Availability: ${data.availability || "Not specified"}\n`;
  context += `\nShort Bio:\n${data.shortBio || "Not available"}\n\n`;
  if (data.fullBio) {
    context += `Full Bio:\n${data.fullBio}\n\n`;
  }

  // Contact Information
  if (data.email || data.phone) {
    context += `## CONTACT INFORMATION\n`;
    if (data.email) context += `Email: ${data.email}\n`;
    if (data.phone) context += `Phone: ${data.phone}\n`;
    context += `\n`;
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    context += `## SKILLS & EXPERTISE\n`;
    const skillsByCategory: Record<string, any[]> = {};
    data.skills.forEach((skill: any) => {
      const category = skill.category || "Other";
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(skill);
    });

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      context += `\n### ${category}\n`;
      skills.forEach((skill: any) => {
        context += `- ${skill.name}`;
        if (skill.proficiencyLevel) context += ` (${skill.proficiencyLevel})`;
        if (skill.yearsExperience)
          context += ` - ${skill.yearsExperience} years experience`;
        context += `\n`;
      });
    });
    context += `\n`;
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    context += `## PROFESSIONAL EXPERIENCE\n\n`;
    data.experience.forEach((exp: any, index: number) => {
      context += `### ${index + 1}. ${exp.jobTitle} at ${exp.company}\n`;
      context += `Location: ${exp.location || "Not specified"}\n`;
      context += `Type: ${exp.employmentType || "Not specified"}\n`;
      const startDate = exp.startDate
        ? new Date(exp.startDate).getFullYear()
        : "N/A";
      const endDate = exp.endDate
        ? new Date(exp.endDate).getFullYear()
        : "Present";
      context += `Duration: ${startDate} - ${endDate}\n`;

      if (exp.responsibilities && exp.responsibilities.length > 0) {
        context += `\nResponsibilities:\n`;
        exp.responsibilities.forEach((resp: string) => {
          context += `- ${resp}\n`;
        });
      }

      if (exp.achievements && exp.achievements.length > 0) {
        context += `\nKey Achievements:\n`;
        exp.achievements.forEach((ach: string) => {
          context += `- ${ach}\n`;
        });
      }
      context += `\n`;
    });
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    context += `## PROJECTS\n\n`;
    data.projects.forEach((project: any, index: number) => {
      context += `### ${index + 1}. ${project.title}\n`;
      context += `\nDescription: ${project.des || "Not available"}\n`;

      if (project.link) context += `Live URL: ${project.link}\n`;
      context += `\n`;
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    context += `## EDUCATION\n\n`;
    data.education.forEach((edu: any, index: number) => {
      context += `### ${index + 1}. ${edu.degree} in ${edu.fieldOfStudy}\n`;
      context += `Institution: ${edu.institution}\n`;
      if (edu.location) context += `Location: ${edu.location}\n`;
      const startDate = edu.startDate
        ? new Date(edu.startDate).getFullYear()
        : "N/A";
      const endDate = edu.endDate
        ? new Date(edu.endDate).getFullYear()
        : "Present";
      context += `Duration: ${startDate} - ${endDate}\n`;
      if (edu.gpa) context += `GPA: ${edu.gpa}\n`;

      if (edu.achievements && edu.achievements.length > 0) {
        context += `\nAchievements:\n`;
        edu.achievements.forEach((ach: string) => {
          context += `- ${ach}\n`;
        });
      }
      context += `\n`;
    });
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    context += `## CERTIFICATIONS\n\n`;
    data.certifications.forEach((cert: any, index: number) => {
      context += `${index + 1}. ${cert.name}\n`;
      context += `   Issuer: ${cert.issuingOrganization}\n`;
      if (cert.issueDate) {
        const issueDate = new Date(cert.issueDate).getFullYear();
        context += `   Issued: ${issueDate}\n`;
      }
      if (cert.expiryDate) {
        const expiryDate = new Date(cert.expiryDate).getFullYear();
        context += `   Expires: ${expiryDate}\n`;
      }
      if (cert.credentialId)
        context += `   Credential ID: ${cert.credentialId}\n`;
      if (cert.description) context += `   ${cert.description}\n`;
      context += `\n`;
    });
  }

  // Services
  if (data.services && data.services.length > 0) {
    context += `## SERVICES OFFERED\n\n`;
    data.services.forEach((service: any, index: number) => {
      context += `### ${index + 1}. ${service.title}\n`;
      context += `${service.description || ""}\n`;

      if (service.features && service.features.length > 0) {
        context += `\nWhat's Included:\n`;
        service.features.forEach((feature: string) => {
          context += `- ${feature}\n`;
        });
      }

      if (service.pricing) context += `\nPricing: ${service.pricing}\n`;
      if (service.timeline) context += `Timeline: ${service.timeline}\n`;
      context += `\n`;
    });
  }

  return context;
}

// Helper function to create system prompt
function createSystemPrompt(portfolioData: any): string {
  const name = portfolioData?.firstName
    ? `${portfolioData.firstName} ${portfolioData.lastName || ""}`
    : "the portfolio owner";

  return `You are the AI representative of ${name}, acting as their digital twin and professional assistant.

# IDENTITY & ROLE
You represent ${name} in professional conversations. When visitors ask questions, you provide accurate information about their portfolio, experience, and capabilities based ONLY on the data provided below.

# STRICT RULES - FOLLOW THESE WITHOUT EXCEPTION

1. **Portfolio-Only Scope**: ONLY answer questions about ${name}'s:
   - Professional background and experience
   - Technical skills and expertise
   - Projects and their details
   - Education and certifications
   - Services offered
   - Contact information and availability

2. **Data Grounding**: 
   - Base ALL responses ONLY on the portfolio data provided below
   - If information is not in the portfolio data, clearly state "I don't have that information in my portfolio"
   - NEVER make up, invent, or hallucinate information
   - Don't speculate about things not documented

3. **Out of Scope Topics** - Politely redirect if asked about:
   - General programming tutorials or advice (unless directly related to my work)
   - Current tech news or trends
   - Other people, companies, or projects not in my portfolio
   - Personal opinions on topics outside my documented work
   - Debugging help or technical support
   
   **Redirection Template**: "I'm here to discuss ${name}'s portfolio and professional background. For questions about [topic], I'd recommend [relevant alternative]. Is there anything about my work, projects, or experience you'd like to know?"

4. **Personality & Tone**:
   - Speak in first person ("I", "my", "me") as ${name}
   - Be professional yet approachable and friendly
   - Be enthusiastic about the work and projects
   - Be concise but informative
   - Use specific examples from the portfolio when relevant

5. **Call to Action**:
   - Encourage visitors to explore specific projects
   - Suggest checking out relevant work examples
   - Provide contact information when appropriate
   - Direct to live URLs or GitHub repos when mentioned

# PORTFOLIO KNOWLEDGE BASE

${formatPortfolioData(portfolioData)}

# RESPONSE GUIDELINES

- Start responses naturally, without always saying "As ${name}" or "I am ${name}"
- Provide specific details from projects and experience
- Mention relevant technologies and skills when applicable
- If asked about availability, refer to the contact information
- Highlight achievements and impact when relevant
- Keep responses focused and avoid unnecessary verbosity
- Use examples to illustrate capabilities

# EXAMPLE INTERACTIONS

Good:
User: "What's your experience with React?"
Response: "I have extensive React experience! I've been working with it for [X] years. For example, in my [Project Name] project, I used React to [specific achievement]. I'm proficient in modern React patterns including hooks, context, and performance optimization."

Good:
User: "Can you tell me about your AI projects?"
Response: "Sure! I've worked on several AI projects. My most notable is [Project Name], where I [description]. I also have experience with [relevant technologies]. Would you like to hear more about any specific project?"

Bad:
User: "What do you think about the latest JavaScript framework?"
Response: "I'm here to discuss my portfolio and professional background. For general JavaScript framework discussions, I'd recommend tech blogs or community forums. Is there anything about my work with JavaScript frameworks in my projects you'd like to know?"

Remember: You are ${name}'s professional representative. Stay focused, accurate, and helpful!`;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Fetch portfolio data from Sanity
    const { data: portfolioData } = await sanityFetch({
      query: PORTFOLIO_DATA_QUERY,
    });

    // Create personalized system prompt with portfolio context
    const systemPrompt = createSystemPrompt(portfolioData);

    // Stream response with system prompt
    const result = streamText({
      model: google("gemini-3.6-flash"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
