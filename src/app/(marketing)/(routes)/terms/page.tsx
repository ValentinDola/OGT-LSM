import { Item } from "@radix-ui/react-select";

const terms = [
  {
    title: "Interpretation and Definitions",
    description:
      "The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice and any or all Agreements:Client, You, and Your refers to you, the person accessing this website and accepting the Company's terms and conditions. The Company, Ourselves, We, Our, and Us, refers to OGT Academy. Party, Parties, or Us, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services/products, in accordance with and subject to, prevailing law of Togo. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same.",
  },
  {
    title: "Use of Cookies",
    description:
      "We employ the use of cookies. By using OGT Academy's website you consent to the use of cookies in accordance with OGT Academy's privacy policy.",
  },
  {
    title: "Intellectual Property Rights",
    description:
      "Unless otherwise stated, OGT Academy and/or its licensors own the intellectual property rights for all material on OGT Academy. All intellectual property rights are reserved. You may view and/or print pages from https://www.ogtacademy.com for your own personal use subject to restrictions set in these terms and conditions.",

    others: {
      p: "You must not:",
      nd: [
        "Republish material from https://www.ogtacademy.com",
        "Sell, rent, or sub-license material from https://www.ogtacademy.com",
        "Reproduce, duplicate, or copy material from https://www.ogtacademy.com",
      ],
    },
  },
  {
    title: "Hyperlinking to Our Content",
    description:
      "The following organizations may link to our website without prior written approval:",
    others: {
      p: "You must not:",
      nd: [
        "Government agencies;",
        "News organizations;",
        "Search engines;",
        "Online directory distributors when they list us in the directory may link to our website in the same manner as they hyperlink to the websites of other listed businesses; and",
        "Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our website.",
        "is not in any way misleading;",
        "does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and",
        "fits within the context of the linking party's site.",
        "commonly-known consumer and/or business information sources;",
        "dot.com community sites;",
        "associations or other groups representing charities;",
        "online directory distributors;",
      ],
    },
  },
  {
    title: "Financial Advice Disclaimer",
    description:
      "OGT Academy provides educational content for informational purposes only and does not constitute financial advice. We do not offer investments or trading services, nor do we handle or request funds from our users. Any decisions made based on information found on our website are at the user's own risk.",
  },
  {
    title: "Limitation of Liability",
    description:
      "In no event shall OGT Academy, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise, and OGT Academy, including its officers, directors, and employees shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website..",
  },
  {
    title: "Variation of Terms",
    description:
      "OGT Academy is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review such terms regularly to ensure you understand all terms and conditions governing the use of this website.",
  },
];

const Terms = () => {
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[80px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-base tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2rem] max-[600px]:text-[2.3rem] uppercase">
            termes et conditions
          </h2>
        </div>
        <div className="mt-5 flex flex-col items-start justify-center px-5">
          <ul className="list-decimal">
            {terms.map((term, i) => (
              <div key={i}>
                <li className="font-bold text-sm text-[#F85C50]">
                  {term.title}
                </li>

                <p className="text-sm">{term.description}</p>
                {term.others && (
                  <>
                    <p className="text-sm">{term.others.p}</p>
                    <ul className="list-disc ml-4">
                      {term.others?.nd.map((ndd, i) => (
                        <li key={i} className="text-sm -my-0 font-semibold">
                          {ndd}
                        </li>
                      ))}
                    </ul>
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

export default Terms;
