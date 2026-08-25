
export const metadata = {
  title: 'Privacy Policy | Hugocrest',
  description: 'Privacy policy and data protection information for Hugocrest Hugocrest Bank Zürich AG.',
};

export default function Page() {
  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '60px 24px 80px',
      fontFamily: "'Open Sans', sans-serif",
      color: '#333',
      lineHeight: '1.8',
    }}>
      {/* Hero */}
      <div style={{
        borderBottom: '3px solid #047857',
        paddingBottom: '32px',
        marginBottom: '48px',
      }}>
        <h1 style={{
          fontSize: 'calc(42px + var(--font-add, 0px))',
          fontWeight: '300',
          color: '#666e71',
          margin: '0 0 16px',
          letterSpacing: '-0.5px',
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 'calc(17px + var(--font-add, 0px))', color: '#888', margin: 0 }}>
          Data protection is of paramount importance to Hugocrest Hugocrest Bank Zürich AG (hereinafter &ldquo;Bank&rdquo;).
        </p>
      </div>

      {/* Sections */}
      <Section num="1" title="Sources of Personal Data">
        <p>In connection with business relationships with clients or potential clients, the Bank processes data received directly from the data subject (e.g., clients). The Bank also obtains data from service providers (e.g., credit agencies, databases), public registers (e.g., commercial registers), and authorities (e.g., courts, prosecutors&apos; offices) that the Bank requires to provide its services or for legal and regulatory reasons.</p>
        <p>Related natural or legal persons include, in particular: authorized representatives, beneficial owners and controlling persons, payment recipients, and any other person with a relationship relevant to the client–Bank business relationship.</p>
      </Section>

      <Section num="2" title="Types of Personal Data Processed">
        <p>The categories of personal data processed include: personal information (e.g., name, date/place of birth, marital status, address, interests, family relationships, contact details), transaction data, financial circumstances, investment objectives, tax residency, US status, professional information, website usage data (e.g., IP address, cookies), and other information on powers of attorney, personal relationships, and log files.</p>
        <p>In certain cases, the Bank may process special categories of personal data (e.g., biometric data, health data, criminal or administrative sanctions, ethnic origin, political views, religious beliefs) in connection with:</p>
        <ul>
          <li>Express consent from the data subject</li>
          <li>Assertion, exercise, or defense of legal claims</li>
          <li>Data that the data subject has made publicly available</li>
          <li>Compliance with legal or regulatory obligations</li>
        </ul>
      </Section>

      <Section num="3" title="Purposes of Data Processing">
        <p>The Bank collects and processes only the personal data necessary to achieve a specific purpose. Data is processed in particular for the following purposes:</p>
        <ul>
          <li>Client business — providing products and services offered by the Bank</li>
          <li>Legal and regulatory compliance — e.g., Anti-Money Laundering Act, tax laws, disclosure obligations</li>
          <li>Marketing — improving products and services, direct marketing, newsletter distribution</li>
          <li>Legitimate interests — business and risk management, IT security, building security</li>
          <li>Administration — account/portfolio management for pension and vested benefits foundations</li>
        </ul>
      </Section>

      <Section num="4" title="Compliance with Data Protection Principles">
        <p>The Bank processes personal data in accordance with the Swiss Federal Act on Data Protection (FADP) and the Data Protection Ordinance (DPO). The Bank ensures that personal data is processed lawfully, in good faith, and proportionately. Through appropriate technical and organizational measures, the Bank ensures that processed data is accessible only to authorized persons, available when needed, and cannot be altered without detection.</p>
      </Section>

      <Section num="5" title="Legal Basis for Processing">
        <p><strong>5.1 Overriding Public or Private Interest</strong><br/>
        The Bank processes personal data to initiate or conclude contracts, fulfill contractual obligations, analyze client behavior, and for direct marketing purposes.</p>
        <p><strong>5.2 Legal Basis</strong><br/>
        The Bank is obligated by various legal and regulatory provisions to process personal data, including the Financial Market Supervision Act, Banking Act, Anti-Money Laundering Act, and Financial Services Act.</p>
        <p><strong>5.3 Consent</strong><br/>
        Where consent is required, the Bank obtains it from the data subject. Consent may be revoked at any time. Revocation takes effect upon receipt by the Bank and does not affect the lawfulness of processing prior to revocation.</p>
      </Section>

      <Section num="6" title="Retention Period">
        <p>The Bank processes and retains personal data for as long as necessary to fulfill the purpose for which it was collected, or to comply with contractual or legal obligations. As a rule, this is 10 years after the service has been provided or the business relationship has ended.</p>
      </Section>

      <Section num="7" title="Data Subject Rights">
        <p>Subject to legal obligations, data subjects have the following rights:</p>
        <ul>
          <li>Right to information about personal data</li>
          <li>Right to rectification of personal data</li>
          <li>Right to data portability</li>
          <li>Right to restrict processing</li>
          <li>Right to withdraw consent</li>
          <li>Right to erasure and objection</li>
        </ul>
        <p>If providing information or transferring data involves disproportionate effort, the Bank may charge a cost contribution of up to CHF 300.</p>
      </Section>

      <Section num="8" title="Recipients of Personal Data">
        <p>Personal data is only processed by those persons who need it to fulfill contractual or legal obligations. Where necessary, service providers and third parties (e.g., outsourcing partners) are granted access to data, while banking secrecy and other legal provisions are observed.</p>
      </Section>

      <Section num="9" title="Data Transfer Abroad">
        <p>Data transfer abroad does not take place as a general rule. If personal data is transferred abroad, this is done in compliance with legally prescribed provisions and where necessary to fulfill the contract (e.g., international transactions or order execution at foreign trading venues).</p>
      </Section>

      <Section num="10" title="Automated Processing">
        <p>The Bank processes personal data automatically in certain cases, for example in connection with its legal obligation to combat money laundering and terrorist financing through monitoring and evaluation of payment transactions.</p>
      </Section>

      <Section num="11" title="Cookies &amp; Analytics">
        <p>The Bank&apos;s website uses cookies — small text files stored on your device — to make the website more attractive and enable certain functions. Some cookies are deleted after the browser session ends (session cookies), while others remain on the device (persistent cookies).</p>
        <p>The website uses Google Analytics to analyze website usage. The information generated by cookies is transmitted to and stored on a Google server. The Bank has extended Google Analytics with the &ldquo;AnonymizeIP&rdquo; code to ensure anonymized collection of IP addresses.</p>
      </Section>

      <Section num="12" title="Amendments">
        <p>The Bank reserves the right to amend this privacy policy at any time in compliance with data protection regulations. The current version is always available on the Bank&apos;s website.</p>
      </Section>

      <Section num="13" title="Contact" isLast>
        <p>The Bank is responsible for the processing of personal data. Inquiries related to data protection may be directed to:</p>
        <div style={{
          backgroundColor: '#f8f7f4',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #e8e4dc',
          marginTop: '12px',
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#047857' }}>Hugocrest</p>
          <p style={{ margin: '0 0 4px' }}>Hugocrest Bank Zürich AG</p>
          <p style={{ margin: '0 0 4px' }}>Data Protection Officer</p>
          <p style={{ margin: '0 0 4px' }}>Rämistrasse 23</p>
          <p style={{ margin: '0 0 12px' }}>8001 Zürich</p>
          <p style={{ margin: '0 0 4px' }}>Tel. 044 268 61 61</p>
          <p style={{ margin: 0 }}>
            <a href="mailto:datenschutz@hugocrest.com" style={{ color: '#047857', textDecoration: 'none' }}>datenschutz@hugocrest.com</a>
          </p>
        </div>
      </Section>
    </main>
  );
}

function Section({ num, title, children, isLast }) {
  return (
    <section style={{
      marginBottom: isLast ? '0' : '40px',
      paddingBottom: isLast ? '0' : '40px',
      borderBottom: isLast ? 'none' : '1px solid #eee',
    }}>
      <h2 style={{
        fontSize: 'calc(22px + var(--font-add, 0px))',
        fontWeight: '600',
        color: '#047857',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#047857',
          color: '#fff',
          fontSize: 'calc(15px + var(--font-add, 0px))',
          fontWeight: '700',
          flexShrink: 0,
        }}>{num}</span>
        {title}
      </h2>
      <div style={{ paddingLeft: '48px', fontSize: 'calc(15px + var(--font-add, 0px))', color: '#555' }}>
        {children}
      </div>
    </section>
  );
}