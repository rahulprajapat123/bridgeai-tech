import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// CaseStudyDetail Component
function CaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      const response = await axios.get(`/case-studies/${slug}`);
      setCaseStudy(response.data);
    } catch (error) {
      console.error('Error fetching case study:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <h1 className="text-3xl font-bold">Case study not found</h1>
        <Link to="/case-studies" className="text-cyan-400 mt-4 inline-block">
          ← Back to case studies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/case-studies" className="text-cyan-400 mb-8 inline-block hover:text-cyan-300">
          ← Back to case studies
        </Link>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 rounded-lg">
              <span className="font-bold">{caseStudy.company}</span>
            </div>
            <span className="text-slate-400">{caseStudy.industry}</span>
          </div>

          <h1 className="text-4xl font-bold mb-8">{caseStudy.title}</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">The Challenge</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{caseStudy.challenge}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Our Solution</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Results</h2>
              <ul className="space-y-3">
                {caseStudy.results.map((result, i) => (
                  <li key={i} className="flex items-start space-x-3 text-lg">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {caseStudy.testimonial && caseStudy.testimonial.quote && (
              <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-cyan-500">
                <p className="text-xl italic text-slate-300 mb-4">"{caseStudy.testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{caseStudy.testimonial.author}</p>
                  <p className="text-sm text-slate-400">{caseStudy.testimonial.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Start Your Transformation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyDetail;