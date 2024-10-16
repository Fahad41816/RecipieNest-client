/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */  

export default function AboutPage() {
  return (
      <div className="bg-default-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <section className="bg-default-white shadow-lg rounded-lg p-8 mb-10">
            <h2 className="text-4xl font-bold text-center mb-4 text-default-gray-800">
              About Us
            </h2>
            <p className="text-lg text-center text-default-gray-600">
              Welcome to our Recipe Sharing Community! We are passionate about connecting food lovers and home cooks across the globe. Our platform allows everyone to share, discover, and organize recipes with ease.
            </p>
          </section>
  
          {/* Our Mission Section */}
          <section className="bg-default-white shadow-lg text-default-white rounded-lg p-8 mb-10">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              Our mission is to build a diverse and inclusive platform where people from all backgrounds can share their love for cooking. Whether you&#39;re a beginner or a seasoned chef, we aim to inspire creativity in the kitchen and help users discover exciting new recipes.
            </p>
          </section>
  
          {/* Team Section */}
          <section className="bg-default-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-bold text-center mb-8 text-default-gray-800">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="/team-member-1.jpg"
                  alt="Team Member 1"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h4 className="text-xl font-bold text-default-gray-800">John Doe</h4>
                <p className="text-default-gray-500">Founder & CEO</p>
                <p className="text-sm text-default-gray-600 mt-2">
                  John is a seasoned chef with a passion for creating innovative recipes and building online communities.
                </p>
              </div>
  
              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="/team-member-2.jpg"
                  alt="Team Member 2"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h4 className="text-xl font-bold text-default-gray-800">Jane Smith</h4>
                <p className="text-default-gray-500">Head of Marketing</p>
                <p className="text-sm text-default-gray-600 mt-2">
                  Jane brings a creative edge to our marketing strategies and helps spread the word about our vibrant community.
                </p>
              </div>
  
              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="/team-member-3.jpg"
                  alt="Team Member 3"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h4 className="text-xl font-bold text-default-gray-800">Alex Johnson</h4>
                <p className="text-default-gray-500">Lead Developer</p>
                <p className="text-sm text-default-gray-600 mt-2">
                  Alex is the technical genius behind the platform, ensuring a seamless and enjoyable user experience for everyone.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
