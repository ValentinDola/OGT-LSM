const terms = [
  {
    description:
      "OGT Academy operates the https://www.ogtacademy.com website, which provides educational content for individuals interested in learning about forex trading.",
  },
  {
    description:
      "This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.",
  },
  {
    description:
      "If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.",
  },
  {
    title: "Information Collection and Use",
    description:
      "For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, email address, phone number, and country of residence. The information that we collect will be used to contact or identify you.",
  },
  {
    title: "Log Data",
    description:
      "We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol (IP) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.",
  },
  {
    title: "Cookies",
    description:
      "Cookies are files with a small amount of data that is commonly used as an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer's hard drive.",
  },
  {
    description:
      "Our website uses these cookies to collect information and to improve our Service. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.",
  },
  {
    title: "Service Providers",
    description:
      "We may employ third-party companies and individuals due to the following reasons:",

    others: {
      p: "We may use them:",
      nd: [
        "To facilitate our Service",
        "To provide the Service on our behalf",
        "To perform Service-related services; or",
        "To assist us in analyzing how our Service is used.",
      ],
      ps: "We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
    },
  },

  {
    title: "Security",
    description:
      "We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.",
  },
  {
    title: "Links to Other Sites",
    description:
      "Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
  },
  {
    title: "Children's Privacy",
    description:
      "Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to take necessary actions.",
  },
  {
    title: "Changes to This Privacy Policy",
    description:
      "We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at info@ogtacademy.com..",
  },
];

const Privacy = () => {
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[80px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-base tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2rem] max-[600px]:text-[2.3rem] uppercase">
            Politique de confidentialité
          </h2>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center px-5">
          <ul className="list-decimal">
            {terms.map((term, i) => (
              <div key={i}>
                {term.title && (
                  <li className="font-bold text-sm text-[#F85C50]">
                    {term.title}
                  </li>
                )}

                <p className="text-sm">{term?.description}</p>
                {term.others && (
                  <>
                    <p className="text-sm">{term?.others?.p}</p>
                    <ul className="list-disc ml-4">
                      {term?.others?.nd.map((ndd) => (
                        <li className="text-sm -my-0 font-semibold">{ndd}</li>
                      ))}
                    </ul>
                    <p className="text-sm">{term?.others?.ps}</p>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
