import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollAnimation from "@/components/ScrollAnimation";
import BackToTop from "@/components/BackToTop";
import { Microscope, FileText, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import researchLabImage from "@/assets/research-lab-hq.jpg";
import conditionAnxiety from "@/assets/condition-anxiety.jpg";
import conditionChronicPain from "@/assets/condition-chronic-pain.jpg";
import conditionArthritis from "@/assets/condition-arthritis.jpg";
import conditionBackPain from "@/assets/condition-back-pain.jpg";
import conditionCRPS from "@/assets/condition-crps.jpg";
import conditionEpilepsy from "@/assets/condition-epilepsy.jpg";
import conditionInsomnia from "@/assets/condition-insomnia.jpg";
import conditionMigraines from "@/assets/condition-migraines.jpg";
import conditionMS from "@/assets/condition-ms.jpg";
import conditionNeuropathicPain from "@/assets/condition-neuropathic-pain.jpg";
import conditionParkinsons from "@/assets/condition-parkinsons.jpg";
import conditionPTSD from "@/assets/condition-ptsd.jpg";

const conditionsByCategory = {
  "Pain Management": [
    { id: "chronic-pain", name: "Chronic Pain", image: conditionChronicPain },
    { id: "arthritis", name: "Arthritis", image: conditionArthritis },
    { id: "back-pain", name: "Back Pain", image: conditionBackPain },
    { id: "complex-regional-pain-syndrome", name: "Complex Regional Pain Syndrome", image: conditionCRPS },
    { id: "migraines", name: "Migraines", image: conditionMigraines },
    { id: "neuropathic-pain", name: "Neuropathic Pain", image: conditionNeuropathicPain },
  ],
  "Mental Health": [
    { id: "anxiety", name: "Anxiety", image: conditionAnxiety },
    { id: "ptsd", name: "PTSD", image: conditionPTSD },
  ],
  "Neurological": [
    { id: "epilepsy", name: "Epilepsy", image: conditionEpilepsy },
    { id: "multiple-sclerosis", name: "Multiple Sclerosis", image: conditionMS },
    { id: "parkinsons-disease", name: "Parkinson's Disease", image: conditionParkinsons },
  ],
  "Sleep Disorders": [
    { id: "insomnia", name: "Insomnia", image: conditionInsomnia },
  ],
};

const Research = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Linear style */}
        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <div className="max-w-5xl">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
                  Research & Development
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl font-light">
                  Advancing cannabis science through rigorous research and clinical trials
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Hero Image */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl border border-border/30">
            <img 
              src={researchLabImage} 
              alt="Research laboratory with cannabis testing" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
          </div>
        </section>

        {/* Main Content - Linear style */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 tracking-tight">
                  Essential Research
                </h2>
                <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed mb-6">
                  We partner with leading institutions Imperial College London and University of Pennsylvania, to deepen the clinical understanding of cannabis-based medicine. Scientific research isn't just what we do – it's everything we stand for.
                </p>
                <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed mb-16">
                  Our research division conducts rigorous clinical trials to advance the scientific understanding of cannabinoids and their medical applications, contributing to a growing body of evidence that breaks down stigma and pushes for progress.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="card-linear p-7 hover-lift">
                  <Microscope className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Clinical Trials</h3>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    We conduct rigorous clinical trials examining the efficacy and safety of cannabis-based medicines for various medical conditions.
                  </p>
                </div>
                <div className="card-linear p-7 hover-lift">
                  <FileText className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Publications</h3>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    Our research team publishes findings in peer-reviewed journals, contributing to the global understanding of cannabis medicine.
                  </p>
                </div>
                <div className="card-linear p-7 hover-lift">
                  <Award className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Recognition</h3>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    Our work has been recognized with multiple awards for contributions to cannabis science and medical innovation.
                  </p>
                </div>
                <div className="card-linear p-7 hover-lift">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Collaboration</h3>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    We partner with leading universities and research institutions worldwide to accelerate cannabis research.
                  </p>
                </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Research Areas - Linear style */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'hsl(var(--section-color))' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl font-semibold text-white text-center mb-6 tracking-tight">
                Our Research Focus Areas
              </h2>
              <p className="text-lg text-white/70 text-center max-w-3xl mx-auto mb-16 md:mb-20">
                Exploring medical cannabis applications across key therapeutic areas
              </p>
            </ScrollAnimation>
            
            <div className="space-y-20">
              {Object.entries(conditionsByCategory).map(([category, conditions]) => (
                <div key={category}>
                  <ScrollAnimation>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 tracking-tight">
                      {category}
                    </h3>
                  </ScrollAnimation>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition) => (
                      <ScrollAnimation key={condition.id}>
                        <Link
                          to={`/conditions/${condition.id}`}
                          className="group block bg-white/[0.03] backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="h-40 overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02]">
                            <img
                              src={condition.image}
                              alt={condition.name}
                              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5 flex items-center justify-between">
                            <h4 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                              {condition.name}
                            </h4>
                            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ScrollAnimation>
              <div className="mt-16 text-center">
                <Link to="/conditions">
                  <button className="btn-linear text-white border border-white/30 hover:bg-white/10 px-8 py-3 text-lg">
                    View All Eligible Conditions →
                  </button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* CTA - Linear style */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 tracking-tight">
              Interested in our research?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-10">
              Learn more about our ongoing studies and how we're advancing cannabis science.
            </p>
            <Link to="/contact">
              <button className="btn-primary px-7 py-3">
                Contact our research team →
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Research;
