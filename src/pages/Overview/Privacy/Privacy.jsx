import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

//import NavigationBar from '../NavigationBar/NavigationBar'
//import { stickyFooter } from '../Footer/Footer'
import './Privacy.css'

class PrivacyItem extends Component {
  render() {
    return (
      <div className='PrivacyItem' style={{ float: this.props.float }}>
        {this.props.text}
      </div>
    )
  }
}

class Privacy extends Component {
/*
  componentDidMount() {
    document.title = 'Privacy Policy - TEN'
    footerDelay()
  }
  componentDidUpdate() {
    footerDelay()
  }
*/
  render() {
    return (
      <div className='everything'>
        <div className='titleTC'>
          <br />
          Privacy Policy
        </div>
        <div className='lastupdated'>
          <br />
          Last updated November 08, 2019
        </div>
        <ol className='decimal'>
          <div className='text'>
            <br />
            <ul>
              {' '}
              Thank you for choosing to be part of our community at Textbook
              Exchange Network. We are committed to protecting your personal
              information and your right to privacy. If you have any questions
              or concerns about our policy, or our practices with regards to
              your personal information, please contact us at
              textbookexchangenetwork@gmail.com.{' '}
            </ul>
            <br />
            <ul>
              {' '}
              When you visit our website https://textbookexchangenetwork.com/,
              and use our services, you trust us with your personal information.
              We take your privacy very seriously. In this privacy policy, we
              seek to explain to you in the clearest way possible what
              information we collect, how we use it and what rights you have in
              relation to it. We hope you take some time to read through it
              carefully, as it is important. If there are any terms in this
              privacy policy that you do not agree with, please discontinue use
              of our Sites and our services.{' '}
            </ul>
            <br />
            <ul>
              {' '}
              This privacy policy applies to all information collected through
              our website (such as https://textbookexchangenetwork.com/), and/or
              any related services, sales, marketing or events (we refer to them
              collectively in this privacy policy as the "Services").{' '}
            </ul>
            <br />
            <ul>
              {' '}
              Please read this privacy policy carefully as it will help you make
              informed decisions about sharing your personal information with
              us.
            </ul>
            <br />
          </div>
          <li className='subtitle'>
            WHAT INFORMATION DO WE COLLECT?
            <div className='text1'>
              <br />
              Personal information you disclose to us
            </div>
            <div className='short'>
              <br />
              In Short: We collect personal information that you provide to us
              such as name, contact information, and payment information.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We collect personal information that you voluntarily provide to
                us when expressing an interest in obtaining information about us
                or our products and services, when participating in activities
                on the Services or otherwise contacting us.
              </ul>
              <br />
              <ul>
                The personal information that we collect depends on the context
                of your interactions with us and the Services, the choices you
                make and the products and features you use. The personal
                information we collect can include the following:
              </ul>
              <br />
              <ul>
                Publicly Available Personal Information. We collect first name,
                last name, phone numbers, email addresses, and other similar
                data.
              </ul>
              <br />
              <ul>
                Personal Information Provided by You. We collect purchase
                history, financial information, app usage, and other similar
                data.
              </ul>
              <br />
              <ul>
                All personal information that you provide to us must be true,
                complete and accurate, and you must notify us of any changes to
                such personal information.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            HOW DO WE USE YOUR INFORMATION?
            <div className='short'>
              <br />
              In Short: We process your information for purposes based on
              legitimate business interests, the fulfillment of our contract
              with you, compliance with our legal obligations, and/or your
              consent.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We use personal information collected via our Services for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests, in order to enter into or perform
                a contract with you, with your consent, and/or for compliance
                with our legal obligations. We indicate the specific processing
                grounds we rely on next to each purpose listed below.{' '}
              </ul>
              <br />
              <ul>We use the information we collect or receive:</ul>
              <br />
              <ul>
                To send you marketing and promotional communications. We and/or
                our third party marketing partners may use the personal
                information you send to us for our marketing purposes, if this
                is in accordance with your marketing preferences. You can
                opt-out of our marketing emails at any time (see the "WHAT ARE
                YOUR PRIVACY RIGHTS" below.
              </ul>
              <br />
              <ul>
                To send administrative information to you. We may use your
                personal information to send you product, service and new
                feature information and/or information about changes to our
                terms, conditions, and policies.
              </ul>
              <br />
              <ul>
                Fulfill and manage your orders. We may use your information to
                fulfill and manage your orders, payments, and exchanges made
                through the Services.
              </ul>
              <br />
              <ul>
                Request Feedback. We may use your information to request
                feedback and to contact you about your use of our Services.
              </ul>
              <br />
              <ul>
                To enforce our terms, conditions and policies for Business
                Purposes, Legal Reasons and Contractual.
              </ul>
              <br />
              <ul>
                To respond to legal requests and prevent harm. If we receive a
                subpoena or other legal request, we may need to inspect the data
                we hold to determine how to respond.
              </ul>
              <br />
              <ul>
                To respond to user inquiries/offer support to users. We may use
                your information to respond to your inquiries and solve any
                potential issues you might have with the use of our Services.
              </ul>
              <br />
              <ul>
                For other Business Purposes. We may use your information for
                other Business Purposes, such as data analysis, identifying
                usage trends, determining the effectiveness of our promotional
                campaigns and to evaluate and improve our Services, products,
                marketing and your experience. We may use and store this
                information in aggregated and anonymized form so that it is not
                associated with individual end users and does not include
                personal information. We will not use identifiable personal
                information without your consent.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            <div className='short'>
              <br />
              In Short: We only share information with your consent, to comply
              with laws, to provide you with services, to protect your rights,
              or to fulfill business obligations.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We may process or share data based on the following legal basis:{' '}
              </ul>
              <div className='lower-latin'>
                <br />
                <li>
                  Consent: We may process your data if you have given us
                  specific consent to use your personal information in a
                  specific purpose.
                </li>
                <li>
                  Legitimate Interests: We may process your data when it is
                  reasonably necessary to achieve our legitimate business
                  interests.
                </li>
                <li>
                  Performance of a Contract: Where we have entered into a
                  contract with you, we may process your personal information to
                  fulfill the terms of our contract.
                </li>
                <li>
                  Legal Obligations: We may disclose your information where we
                  are legally required to do so in order to comply with
                  applicable law, governmental requests, a judicial proceeding,
                  court order, or legal process, such as in response to a court
                  order or a subpoena (including in response to public
                  authorities to meet national security or law enforcement
                  requirements.
                </li>
                <li>
                  Vital Interests: We may disclose your information where we
                  believe it is necessary to investigate, prevent, or take
                  action regarding potential violations of our policies,
                  suspected fraud, situations involving potential threats to the
                  safety of any person and illegal activities, or as evidence in
                  litigation in which we are involved.
                </li>
              </div>
              <br />
              <ul>
                More specifically, we may need to process your data or share
                your personal information in the following situations:
              </ul>
              <div className='lower-latin'>
                <br />
                <li>
                  Vendors, Consultants and Other Third-Party Service Providers.
                  We may share your data with third party vendors, service
                  providers, contractors or agents who perform services for us
                  or on our behalf and require access to such information to do
                  that work. Examples include: payment processing, data
                  analysis, email delivery, hosting services, customer service
                  and marketing efforts. We may allow selected third parties to
                  use tracking technology on the Services, which will enable
                  them to collect data about how you interact with the Services
                  over time. This information may be used to, among other
                  things, analyze and track data, determine the popularity of
                  certain content and better understand online activity. Unless
                  described in this Policy, we do not share, sell, rent or trade
                  any of your information with third parties for their
                  promotional purposes.
                </li>
                <br />
              </div>
            </div>
          </li>
          <li className='subtitle'>
            HOW LONG DO WE KEEP YOUR INFORMATION?
            <div className='short'>
              <br />
              In Short: We keep your information for as long as necessary to
              fulfill the purposes outlined in this privacy policy unless
              otherwise required by law.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We will only keep your personal information for as long as it is
                necessary for the purposes set out in this privacy policy,
                unless a longer retention period is required or permitted by law
                (such as tax, accounting or other legal requirements).
              </ul>
              <br />
              <ul>
                When we have no ongoing legitimate business need to process your
                personal information, we will either delete or anonymize it, or,
                if this is not possible (for example, because your personal
                information has been stored in backup archives), then we will
                securely store your personal information and isolate it from any
                further processing until deletion is possible.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            HOW DO WE KEEP YOUR INFORMATION SAFE?
            <div className='short'>
              <br />
              In Short: We aim to protect your personal information through a
              system of organizational and technical security measures.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process. However, please also remember
                that we cannot guarantee that the internet itself is 100%
                secure. Although we will do our best to protect your personal
                information, transmission of personal information to and from
                our Services is at your own risk. You should only access the
                services within a secure environment.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            DO WE COLLECT INFORMATION FROM MINORS?
            <div className='short'>
              <br />
              In Short: We do not knowingly collect data from or market to
              children under 18 years of age.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We do not knowingly solicit data from or market to children
                under 18 years of age. By using the Services, you represent that
                you are at least 18 or that you are the parent or guardian of
                such a minor and consent to such minor dependent’s use of the
                Services. If we learn that personal information from users less
                than 18 years of age has been collected, we will deactivate the
                account and take reasonable measures to promptly delete such
                data from our records. If you become aware of any data we have
                collected from children under age 18, please contact us at
                textbookexchangenetwork@gmail.com.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            WHAT ARE YOUR PRIVACY RIGHTS?
            <div className='short'>
              <br />
              In Short: You may review, change, or terminate your account at any
              time.
            </div>
            <div className='text2'>
              <br />
              <ul>
                If you are resident in the European Economic Area and you
                believe we are unlawfully processing your personal information,
                you also have the right to complain to your local data
                protection supervisory authority. You can find their contact
                details here:
                http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            CONTROLS FOR DO-NOT-TRACK FEATURES
            <div className='text2'>
              <br />
              <ul>
                Most web browsers and some mobile operating systems and mobile
                applications include a Do-Not-Track (“DNT”) feature or setting
                you can activate to signal your privacy preference not to have
                data about your online browsing activities monitored and
                collected. No uniform technology standard for recognizing and
                implementing DNT signals has been finalized. As such, we do not
                currently respond to DNT browser signals or any other mechanism
                that automatically communicates your choice not to be tracked
                online. If a standard for online tracking is adopted that we
                must follow in the future, we will inform you about that
                practice in a revised version of this privacy policy.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            <div className='short'>
              <br />
              In Short: Yes, if you are a resident of California, you are
              granted specific rights regarding access to your personal
              information.
            </div>
            <div className='text2'>
              <br />
              <ul>
                California Civil Code Section 1798.83, also known as the “Shine
                The Light” law, permits our users who are California residents
                to request and obtain from us, once a year and free of charge,
                information about categories of personal information (if any) we
                disclosed to third parties for direct marketing purposes and the
                names and addresses of all third parties with which we shared
                personal information in the immediately preceding calendar year.
                If you are a California resident and would like to make such a
                request, please submit your request in writing to us using the
                contact information provided below.
              </ul>
              <br />
              <ul>
                If you are under 18 years of age, reside in California, and have
                a registered account with the Services, you have the right to
                request removal of unwanted data that you publicly post on the
                Services. To request removal of such data, please contact us
                using the contact information provided below, and include the
                email address associated with your account and a statement that
                you reside in California. We will make sure the data is not
                publicly displayed on the Services, but please be aware that the
                data may not be completely or comprehensively removed from our
                systems.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            DO WE MAKE UPDATES TO THIS POLICY?
            <div className='short'>
              <br />
              In Short: Yes, we will update this policy as necessary to stay
              compliant with relevant laws.
            </div>
            <div className='text2'>
              <br />
              <ul>
                We may update this privacy policy from time to time. The updated
                version will be indicated by an updated “Revised” date and the
                updated version will be effective as soon as it is accessible.
                If we make material changes to this privacy policy, we may
                notify you either by prominently posting a notice of such
                changes or by directly sending you a notification. We encourage
                you to review this privacy policy frequently to be informed of
                how we are protecting your information.
              </ul>
              <br />
            </div>
          </li>
          <li className='subtitle'>
            HOW CAN YOU CONTACT US ABOUT THIS POLICY?
            <div className='text2'>
              <br />
              <ul>
                If you have questions or comments about this policy, you may
                email us at textbookexchangenetwork@gmail.com
              </ul>
              <br />
            </div>
          </li>
          <li className='bold'>
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            <div className='text2'>
              <br />
              <ul>
                You may have the right to request access to the personal
                information we collect from you, change that information, or
                delete it in some circumstances. To request to review, update,
                or delete your personal information, please submit a request
                form by emailing us at textbookexchangenetwork@gmail.com
              </ul>
            </div>
          </li>
        </ol>
      </div>
    )
  }
}

function footerDelay() {
  setTimeout(() => {
    stickyFooter(0)
  }, 1)
}

export default Privacy
