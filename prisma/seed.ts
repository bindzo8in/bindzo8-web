import { PrismaClient } from "@/app/generated/prisma/client"
import bcrypt from "bcryptjs"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const pool = new Pool({ connectionString: process.env.PRISMA_DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // ─── Admin user ─────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@bindzo8.com"
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword },
  })
  console.log("✅ Admin:", admin.email)

  // ─── Projects ────────────────────────────────────────────────────────
  // const projects = [
  //   {
  //     title: "Travel Website Design",
  //     description:
  //       "A modern, visually rich travel website designed with smooth navigation, destination highlights, package listings, and booking-friendly layouts to attract travelers and convert visitors into customers.",
  //     category: "Web Design",
  //     tag: "UI/UX",
  //     mediaUrl: "/products/1.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Good Vibes Package Design",
  //     description:
  //       "A vibrant, eye-catching packaging concept created for Good Vibes food products, focusing on freshness, clarity, and shelf appeal to make the brand stand out instantly.",
  //     category: "Branding",
  //     tag: "Packaging",
  //     mediaUrl: "/products/2.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Outdoor Banner",
  //     description:
  //       "High-impact outdoor banner design crafted for maximum visibility, bold messaging, and strong brand presence, perfect for promotions, events, and storefront advertising.",
  //     category: "Print",
  //     tag: "Advertising",
  //     mediaUrl: "/products/3.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Green Diamond Package Design",
  //     description:
  //       "A premium packaging design built around a clean, professional aesthetic with strong visual hierarchy and product-focused detailing to elevate brand trust.",
  //     category: "Branding",
  //     tag: "Packaging",
  //     mediaUrl: "/products/4.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Abirami Package Design",
  //     description:
  //       "A culturally inspired packaging style that blends tradition with modern appeal, ensuring the product looks authentic, attractive, and market-ready.",
  //     category: "Branding",
  //     tag: "Packaging",
  //     mediaUrl: "/products/5.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Expo Advertisement",
  //     description:
  //       "A compelling expo advertisement layout with striking visuals, key highlights, and brand identity elements designed to draw attention in crowded exhibition spaces.",
  //     category: "Print",
  //     tag: "Advertising",
  //     mediaUrl: "/products/5.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Arasan Package Design",
  //     description:
  //       "A bold and clear packaging design with strong typography and color balance, crafted to enhance product recognition and communicate quality at first glance.",
  //     category: "Branding",
  //     tag: "Packaging",
  //     mediaUrl: "/products/6.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Visiting Card Design",
  //     description:
  //       "A sleek and professional business card concept that represents brand identity with clean layout, modern typography, and premium finish.",
  //     category: "Print",
  //     tag: "Business Card",
  //     mediaUrl: "/products/7.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Identity Card Design",
  //     description:
  //       "A neat, functional, and secure ID card design with photo placement, brand colors, and essential employee information — ideal for corporate use.",
  //     category: "Print",
  //     tag: "ID Card",
  //     mediaUrl: "/products/8.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Food Delivery App UI",
  //     description:
  //       "An intuitive mobile-first food delivery app design with rich visuals, fast navigation, and conversion-focused order flow for a seamless customer experience.",
  //     category: "Mobile App",
  //     tag: "UI/UX",
  //     mediaUrl: "/products/1.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "E-Commerce Website",
  //     description:
  //       "A fully responsive e-commerce website with product showcase, cart, and checkout flows optimized for conversion and brand consistency.",
  //     category: "Web Design",
  //     tag: "E-Commerce",
  //     mediaUrl: "/products/2.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Healthcare Platform UI",
  //     description:
  //       "A clean and accessible healthcare portal with appointment booking, patient dashboard, and teleconsultation interface designed for ease of use.",
  //     category: "Web Design",
  //     tag: "Healthcare",
  //     mediaUrl: "/products/3.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Real Estate Landing Page",
  //     description:
  //       "A premium real estate website with property listings, gallery, map integration, and lead capture forms to maximize inquiries.",
  //     category: "Web Design",
  //     tag: "Real Estate",
  //     mediaUrl: "/products/4.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Corporate Brochure Design",
  //     description:
  //       "A professionally designed multi-page corporate brochure with consistent branding, structured layout, and high-impact visuals.",
  //     category: "Print",
  //     tag: "Brochure",
  //     mediaUrl: "/products/5.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Social Media Kit",
  //     description:
  //       "A complete social media branding kit with post templates, story formats, highlight covers, and profile assets for consistent brand presence.",
  //     category: "Digital Marketing",
  //     tag: "Social Media",
  //     mediaUrl: "/products/6.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Product Catalogue Design",
  //     description:
  //       "A visually engaging product catalogue with organized layout, bold imagery, and detailed product descriptions crafted to convert readers into buyers.",
  //     category: "Print",
  //     tag: "Catalogue",
  //     mediaUrl: "/products/7.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Fitness App Design",
  //     description:
  //       "A dynamic and motivating fitness app UI with workout tracking, progress charts, and personalized plans designed to keep users engaged.",
  //     category: "Mobile App",
  //     tag: "UI/UX",
  //     mediaUrl: "/products/8.jpeg",
  //     mediaType: "image",
  //   },
  //   {
  //     title: "Restaurant Menu Design",
  //     description:
  //       "A rich, appetizing restaurant menu with elegant typography, food photography placeholders, and section-based organization for easy navigation.",
  //     category: "Print",
  //     tag: "Menu",
  //     mediaUrl: "/products/1.jpeg",
  //     mediaType: "image",
  //   },
  // ]

  // for (const project of projects) {
  //   await prisma.project.upsert({
  //     where: { id: `seed-project-${project.title.replace(/\s+/g, "-").toLowerCase()}` },
  //     update: {},
  //     create: {
  //       id: `seed-project-${project.title.replace(/\s+/g, "-").toLowerCase()}`,
  //       ...project,
  //     },
  //   })
  // }
  // console.log(`✅ Projects: ${projects.length} seeded`)

  // ─── Testimonials ─────────────────────────────────────────────────────
  // const testimonials = [
  //   {
  //     content:
  //       "Bindzo 8 transformed the way our business operates. Their team not only understood our needs but also provided innovative digital solutions that boosted our efficiency and online visibility.",
  //     author: "Ravi Kumar, Director — NeoTech Enterprises",
  //   },
  //   {
  //     content:
  //       "The SEO services provided were top-notch. Our organic traffic doubled in just three months. A highly recommended digital partner for any growing business.",
  //     author: "Maryam Tabatabaei, Founder",
  //   },
  //   {
  //     content:
  //       "ExhibiTrack Pro has streamlined our entire event management process. The transition was seamless and the support team is incredible.",
  //     author: "Event Manager — Akira Biotek",
  //   },
  //   {
  //     content:
  //       "We saw a 40% increase in leads within the first month after Bindzo 8 revamped our digital marketing strategy. Exceptional work and communication throughout.",
  //     author: "Priya Sharma, CEO — GreenEdge Solutions",
  //   },
  //   {
  //     content:
  //       "The website they built for us is fast, beautiful, and converts visitors into customers. Best investment we've made for our brand online.",
  //     author: "Ahmed Al-Farsi, MD — Gulf Trade Hub",
  //   },
  //   {
  //     content:
  //       "Highly professional team with a sharp eye for design. Our packaging now stands out on shelves, and customers constantly compliment the branding.",
  //     author: "Lakshmi Devi, Owner — Abirami Foods",
  //   },
  //   {
  //     content:
  //       "Bindzo 8 delivered our mobile app on time and within budget. The UI is intuitive and our users love it. We'll definitely work with them again.",
  //     author: "Karthik Rajan, CTO — AppStream Technologies",
  //   },
  //   {
  //     content:
  //       "From logo design to full digital marketing, Bindzo 8 handled everything professionally. Our brand recognition has grown significantly since we partnered with them.",
  //     author: "Sunita Bose, Founder — Bloom Organics",
  //   },
  // ]

  // for (const t of testimonials) {
  //   await prisma.testimonial.upsert({
  //     where: { id: `seed-testimonial-${t.author.replace(/\s+/g, "-").toLowerCase().slice(0, 40)}` },
  //     update: {},
  //     create: {
  //       id: `seed-testimonial-${t.author.replace(/\s+/g, "-").toLowerCase().slice(0, 40)}`,
  //       ...t,
  //     },
  //   })
  // }
  // console.log(`✅ Testimonials: ${testimonials.length} seeded`)

  // ─── Clients ──────────────────────────────────────────────────────────
  // const clients = [
  //   { name: "GENESIS", logoUrl: "/clients/genesis.png" },
  //   { name: "Vrindhavana", logoUrl: "/clients/vrindhavana.png" },
  //   { name: "SUPER SAFE", logoUrl: "/clients/supersafe.png" },
  //   { name: "SUN-MAX", logoUrl: "/clients/sunmax.png" },
  //   { name: "NoviTech", logoUrl: "/clients/novitech.png" },
  //   { name: "Get Direction", logoUrl: "/clients/getdirection.png" },
  //   { name: "VARI", logoUrl: "/clients/vari.png" },
  //   { name: "GOD VIBES", logoUrl: "/clients/godvibes.png" },
  //   { name: "Pantech", logoUrl: "/clients/pantech.png" },
  //   { name: "Impruven", logoUrl: "/clients/impruven.png" },
  // ]

  // for (const c of clients) {
  //   await prisma.client.upsert({
  //     where: { id: `seed-client-${c.name.replace(/\s+/g, "-").toLowerCase()}` },
  //     update: {},
  //     create: {
  //       id: `seed-client-${c.name.replace(/\s+/g, "-").toLowerCase()}`,
  //       ...c,
  //     },
  //   })
  // }
  // console.log(`✅ Clients: ${clients.length} seeded`)

  // ─── Team Members ─────────────────────────────────────────────────────
  // const team = [
  //   {
  //     name: "Manikandan R",
  //     position: "Graphic Designer",
  //     dateOfJoining: new Date("2022-01-10"),
  //     mediaUrl: "/binzo8_members/mani_bro.png",
  //     mediaType: "image",
  //   },
  //   {
  //     name: "Ranjani Rajkumar",
  //     position: "UI/UX Designer",
  //     dateOfJoining: new Date("2022-03-15"),
  //     mediaUrl: "/binzo8_members/ranjani_mam.png",
  //     mediaType: "image",
  //   },
  //   {
  //     name: "Arjun Pradeep",
  //     position: "Full Stack Developer",
  //     dateOfJoining: new Date("2022-06-01"),
  //     mediaUrl: "/binzo8_members/m3.png",
  //     mediaType: "image",
  //   },
  //   {
  //     name: "Divya Krishnan",
  //     position: "Business Developer",
  //     dateOfJoining: new Date("2023-01-05"),
  //     mediaUrl: "/binzo8_members/m4.png",
  //     mediaType: "image",
  //   },
  //   {
  //     name: "Surya Moorthy",
  //     position: "Digital Marketing Lead",
  //     dateOfJoining: new Date("2023-04-20"),
  //     mediaUrl: "/binzo8_members/m5.png",
  //     mediaType: "image",
  //   },
  //   {
  //     name: "Priya Selvam",
  //     position: "Sales Executive",
  //     dateOfJoining: new Date("2023-07-12"),
  //     mediaUrl: "/binzo8_members/m6.png",
  //     mediaType: "image",
  //   },
  // ]

  // for (const member of team) {
  //   await prisma.teamMember.upsert({
  //     where: { id: `seed-team-${member.name.replace(/\s+/g, "-").toLowerCase()}` },
  //     update: {},
  //     create: {
  //       id: `seed-team-${member.name.replace(/\s+/g, "-").toLowerCase()}`,
  //       ...member,
  //     },
  //   })
  // }
  // console.log(`✅ Team: ${team.length} seeded`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("🎉 Seed complete")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
