import { siteData } from "@/data/site";

export function AboutSection() {
  const bioParagraphs = siteData.about.bio.split("\n\n");

  return (
    <section id="about" className="siteContainer aboutMe">
      <div className="aboutTop">
        <div className="aboutLeft">
          <h2>About Me</h2>
          {bioParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          <p>Thank you for visiting and taking the time to learn more about me!</p>
        </div>

        <div className="aboutRight">
          <img
            src={siteData.personal.profileImage}
            alt={siteData.personal.name}
            loading="lazy"
          />

          <div>
            <h3>Interests</h3>
            <p>
              {siteData.about.interests.join("   ·   ")}
            </p>
          </div>

          {siteData.about.awards && siteData.about.awards.length > 0 && (
            <div>
              <h3>Awards / Recognition</h3>
              <p>{siteData.about.awards.join("   ·   ")}</p>
            </div>
          )}

          {siteData.about.organizations && siteData.about.organizations.length > 0 && (
            <div>
              <h3>Organizations / Involvement</h3>
              <p>{siteData.about.organizations.join("   ·   ")}</p>
            </div>
          )}

          <div>
            <h3>Skills</h3>
            <div className="skills">
              {siteData.about.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
