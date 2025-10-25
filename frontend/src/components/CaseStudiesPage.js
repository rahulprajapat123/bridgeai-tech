import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// CaseStudiesPage Component
function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await axios.get('/case-studies');
      setCaseStudies(response.data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <div className="animate-pulse">Loading case studies...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real results from real clients across industries
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <Link
              key={study._id}
              to={`/case-studies/${study.slug}`}
              className="block bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 rounded-lg">
                      <span className="font-bold">{study.company}</span>
                    </div>
                    <span className="text-slate-400">{study.industry}</span>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">{study.title}</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-cyan-400 mb-2">Challenge</h3>
                      <p className="text-slate-300">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-cyan-400 mb-2">Solution</h3>
                      <p className="text-slate-300">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                  {study.metrics && (
                    <>
                      {study.metrics.metric1 && (
                        <div className="text-center bg-slate-900/50 rounded-lg p-4">
                          <div className="text-3xl font-bold text-cyan-400 mb-1">
                            {study.metrics.metric1.value}
                          </div>
                          <div className="text-sm text-slate-400">{study.metrics.metric1.label}</div>
                        </div>
                      )}
                      {study.metrics.metric2 && (
                        <div className="text-center bg-slate-900/50 rounded-lg p-4">
                          <div className="text-3xl font-bold text-cyan-400 mb-1">
                            {study.metrics.metric2.value}
                          </div>
                          <div className="text-sm text-slate-400">{study.metrics.metric2.label}</div>
                        </div>
                      )}
                      {study.metrics.metric3 && (
                        <div className="text-center bg-slate-900/50 rounded-lg p-4">
                          <div className="text-3xl font-bold text-cyan-400 mb-1">
                            {study.metrics.metric3.value}
                          </div>
                          <div className="text-sm text-slate-400">{study.metrics.metric3.label}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 text-cyan-400 font-semibold">
                Read full case study →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CaseStudiesPage;