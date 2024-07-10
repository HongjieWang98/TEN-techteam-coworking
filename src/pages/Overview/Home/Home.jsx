import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';

//Images
import bookimage from '../../../images/book_header.png';
import logoimage from '../../../images/logo2.png';
import booksdisplayimage from '../../../images/book_display_image.png';
import overviewimage from '../../../images/overview_image.png';
import transactionimage from '../../../images/transaction_image.png';

function TitleSection() {
  return (
    <div className="SectionWrapper TitleSection">
      <div>
        <div className="SectionTitleHeader left">Textbook Exchange Network</div>
        <div className="SectionSubtitleHeader left">Changing the textbook game.</div>
        <Link to="/school">
          <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
            Get Started!
          </button>
        </Link>
        <Link to="/how">
          <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
            Learn more
          </button>
        </Link>
        <div>
          <div>
            <div className="circle yellow" />
            <div className="circle green" />
            <div className="circle blue" />
          </div>
          <img className="BookHeaderImage" src={bookimage} alt="Textbook" />
        </div>
      </div>
    </div>
  );
}

function MissionStatement() {
  return (
    <div className="SectionWrapper">
      <div className="SectionContent">
        The Textbook Exchange Network is a 501(c)(3) nonprofit that was founded at Tufts University
        in 2017. The mission of the Textbook Exchange Network (TEN) is to increase access to
        affordable learning materials. To achieve this, TEN provides software to run
        student-to-student exchanges that facilitates the communication between buyers and sellers.
        TEN now saves students across the United States $100,000+ annually.
      </div>
    </div>
  );
}

function StatisticCanvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current; // Access the canvas element directly from the ref
    const ctx = c.getContext('2d');

    // Canvas dimension and circle radius
    const dim = props.dimension;
    const rad = props.radius;

    // Resize canvas according to the screen's DPI for high-resolution
    var dpr = window.devicePixelRatio || 1;
    c.width = dim * dpr;
    c.height = dim * dpr;
    c.style.width = dim + 'px';
    c.style.height = dim + 'px';
    ctx.scale(dpr, dpr);

    // Draw thin circle outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FEC66B';
    ctx.beginPath();
    ctx.arc(dim / 2, dim / 2, rad, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw thicker circle, representing the percentage
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#4F8FCC';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(dim / 2, dim / 2, rad, -Math.PI / 2, 2 * Math.PI * props.completion - Math.PI / 2);
    ctx.stroke();

    // Draw the percentage inside of the circle
    const percentage = `${100 * props.completion}%`;
    ctx.font = '40px Archivo, sans-serif';
    ctx.fillStyle = '#1F78B4';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percentage, dim / 2, dim / 2);
  }, [props.completion, props.dimension, props.radius]); // Depend on props to trigger re-renders

  return (
    <div className="StatisticCanvasContainer" style={{ width: props.dimension }}>
      <canvas ref={canvasRef} className="StatisticCanvas"></canvas>
      <div className="StatisticCanvasLabel">{props.label}</div>
    </div>
  );
}

function ProblemStatement() {
  return (
    <div className="SectionWrapper">
      <div className="SectionTitle">The Problem</div>
      <div className="SectionSubtitle">Textbooks are expensive.</div>
      <div className="SectionContent">
        Rising textbook prices undermine a university’s ability to educate its students. In the US,
        textbooks have assumed a new role. Rather than acting as key learning tools, textbooks have
        become prohibitive barriers for students’ academic careers. A market imbalance exists
        wherein there is no consumer control. Professors choose expensive, well-renowned textbooks
        and students are left scrambling to find an affordable alternative. The result is that
        students are forced to tailor their classes and study habits to accommodate textbook access.
      </div>
      <div className="StatisticCanvasWrapper">
        <StatisticCanvas
          completion={0.65}
          dimension={200}
          radius={80}
          label="of students do not buy textbooks because they are too expensive"
        />
        <StatisticCanvas
          completion={0.48}
          dimension={200}
          radius={80}
          label="of students said textbook costs affected what classes they took"
        />
        <StatisticCanvas
          completion={0.94}
          dimension={200}
          radius={80}
          label="of students who did not buy textbooks said they were concerned this would hurt their grade"
        />
      </div>
      <div className="Citation" style={{ color: 'rgba(128,128,128,.5)' }}>
        Source: US PIRG
      </div>
    </div>
  );
}

function Solution() {
  return (
    <div className="SectionWrapper">
      <div className="SectionTitle">Our Solution</div>
      <div className="SectionSubtitle">We&#8217;re making textbooks more affordable.</div>
      <div className="SectionContent">
        Expensive textbooks are daunting, but we have a solution. We help students to buy and sell
        their textbooks, in an effort to offset the high costs of college. We were founded in 2017
        at Tufts University, but have since spread to a number of new campuses. We offer a
        student-run alternative that brings classmates together to make education materials more
        accessible.
      </div>
      <div className="row DescriptionRow">
        <div className="col-md-6 DescriptionTextWrap align-self-center">
          <div className="SideSubtitle">More Efficient</div>
          <div className="SideDescription">
            Our business model reduces inefficiencies in on-campus textbook exchange markets. Better
            yet: we do not charge students for transactions.
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4 ImageWrap">
          <img className="DescriptionImages img-responsive fit-image" src={booksdisplayimage} />
        </div>
      </div>
      <div className="row DescriptionRow">
        <div className="col-md-4 ImageWrap">
          <img className="DescriptionImages" src={transactionimage} />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6 DescriptionTextWrap align-self-center order-sm-first order-first order-md-last">
          <div className="SideSubtitle">Proven Model</div>
          <div className="SideDescription">
            Our software and process facilitates the exchange of over $100,000 worth of textbooks
            each year, and has spread to a number of universities since opening at Tufts.
          </div>
        </div>
      </div>
      <div className="row DescriptionRow">
        <div className="col-md-6 DescriptionTextWrap align-self-center">
          <div className="SideSubtitle">Volunteer Run</div>
          <div className="SideDescription">
            TEN is entirely volunteer run. Many of our volunteers are also students, who have the
            opportunity to gain real world experience developing commercial software.
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4 ImageWrap">
          <img className="DescriptionImages " src={overviewimage} />
        </div>
      </div>
    </div>
  );
}

function EndingLogo() {
  return (
    <div className="EndingWrapper">
      <img src={logoimage} width="125px" />
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <div className="BodyWrapper">
        <TitleSection />
        <MissionStatement />
        <ProblemStatement />
        <Solution />
        <EndingLogo />
      </div>
    </div>
  );
}

export default HomePage;
