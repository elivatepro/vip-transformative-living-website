'use client';

export default function HowToPrepare() {
  const cards = [
    {
      icon: '🤔',
      title: "Reflect on What's Not Working",
      text: "What's the main challenge you're facing right now? What would change mean for you?",
    },
    {
      icon: '📝',
      title: "Write Down Your Questions",
      text: "What do you want to know about coaching or about working with me?",
    },
    {
      icon: '🎯',
      title: "Come With an Open Mind",
      text: "Be ready for honest conversation, not a sales pitch.",
    },
  ];

  return (
    <section className="bg-surface py-20 px-4 border-y border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl text-foreground mb-4">How to Prepare for Your Call</h2>
          <p className="font-inter text-muted-foreground">Make the most of our 30 minutes together.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-background/50 border border-border rounded-xl p-8 text-center hover:border-gold/50 hover:bg-background hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
              <h3 className="font-inter font-semibold text-foreground mb-3">{card.title}</h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
