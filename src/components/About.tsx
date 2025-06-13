import React from "react";
import { 
  Lightbulb, 
  Rocket, 
  Code, 
  Award, 
  ThumbsUp,
  Briefcase,
  Clock,
  Star
} from "lucide-react";

const ValueCard = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover-card">
      <div className={`${color} p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-agency-blue text-lg mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Innovation",
      description: "I constantly push boundaries to deliver cutting-edge solutions that set new standards.",
      color: "bg-agency-purple",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Excellence",
      description: "I am committed to delivering the highest quality work in every project I undertake.",
      color: "bg-agency-bright-blue",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Professionalism",
      description: "I work closely with my clients to ensure their vision is realized perfectly.",
      color: "bg-agency-purple",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-white" />,
      title: "Reliability",
      description: "I deliver on my promises, meeting deadlines and exceeding expectations.",
      color: "bg-agency-bright-blue",
    },
  ];

  const skills = [
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Web Development",
      description: "Full-stack development with modern technologies",
      color: "bg-agency-purple",
    },
    {
      icon: <Rocket className="h-6 w-6 text-white" />,
      title: "Performance",
      description: "Optimized solutions for speed and efficiency",
      color: "bg-agency-bright-blue",
    },
    {
      icon: <Star className="h-6 w-6 text-white" />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
      color: "bg-agency-purple",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Timely Delivery",
      description: "Efficient project management and on-time delivery",
      color: "bg-agency-bright-blue",
    },
  ];

  return (
    <section id="about" className="py-20 bg-agency-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate web developer and designer dedicated to creating exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex flex-col items-center">
            <img 
              src="/images/profile.png" 
              alt="Profile Picture" 
              className="rounded-full w-40 h-40 object-cover mx-auto mb-8 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-agency-blue mb-4">My Journey</h3>
            <p className="text-gray-600 mb-4">
              With over 2 years of experience in web development, I've dedicated myself to mastering the art of creating beautiful, functional, and user-friendly websites. My journey began with a passion for both design and technology, and I've been fortunate to work with diverse clients across various industries.
            </p>
            <p className="text-gray-600 mb-4">
              I believe in the perfect balance between aesthetic appeal and technical innovation. Every project I take on is an opportunity to push boundaries and create something extraordinary. My approach combines creative thinking with technical expertise to deliver solutions that not only look great but drive real business results.
            </p>
            <div className="flex flex-wrap gap-8 mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-agency-purple">50+</p>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-agency-purple">2+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-agency-purple">100%</p>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-agency-purple/20 h-32 rounded-lg flex items-center justify-center">
                  <Code size={48} className="text-agency-purple" />
                </div>
                <div className="bg-agency-bright-blue/20 h-48 rounded-lg flex items-center justify-center">
                  <Rocket size={48} className="text-agency-bright-blue" />
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-agency-bright-blue/20 h-48 rounded-lg flex items-center justify-center">
                  <Star size={48} className="text-agency-bright-blue" />
                </div>
                <div className="bg-agency-purple/20 h-32 rounded-lg flex items-center justify-center">
                  <Lightbulb size={48} className="text-agency-purple" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-agency-blue mb-8 text-center">My Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-agency-blue mb-8 text-center">My Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <ValueCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                color={skill.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
