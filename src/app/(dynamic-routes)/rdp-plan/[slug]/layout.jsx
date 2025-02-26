const fetchData = async (slug) => {
  try {
    const [sliderRes, rdpRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/slider`, { next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/rdp_plans/${slug}`, { next: { revalidate: 3600 } }),
    ]);

    const [sliders, rdpData] = await Promise.all([
      sliderRes.json(),
      rdpRes.json(),
    ]);

    return {
      sliders,
      rdp: rdpData[0],
      rdpplans: rdpData[1],
      rdpfaqs: rdpData[2],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { rdp } = await fetchData(slug);

  return {
    title: rdp?.title || "RDP VPS Server",
    description: rdp?.meta_description || "RDP VPS Server Description",
    keywords: rdp?.keyword || "",
  };
}

const Layout = async ({ children }) => {
  // Vars

  return <>{children}</>;
};

export default Layout;
