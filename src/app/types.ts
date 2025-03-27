
export interface Category {
    id: string;
    label: string;
    subtopics: SubTopic[];
}
  

export interface L2Story {
    id: string; 
    title: string; 
    l1: string; 
    l2: string; 
    slug: string; // To navigate to the page // 
}

export interface SubTopic {
    id: string; 
    label: string;
    stories: L2Story[]; 
}

export const categories: Category[] = [
    {
        id: 'union-budget', 
        label: 'Union Budget', 
        subtopics: [
            {
                id: 'defense', 
                label: 'Defense', 
                stories: [
                    {
                        id: 'defense-2020', 
                        title: '2020', 
                        l1: 
                            "The Indian government made a significant boost to the country’s defense capabilities in the 2019-20 fiscal year by increasing the defense budget by 7% to Rs 3.05 lakh crore. This allocation marked the highest hike ever, of Rs 9,785 lakh crore.",   
                        l2: `The desert winds carried whispers of economic tightening as Saudi Arabia prepared to navigate a financial storm. In Riyadh, Finance Minister Mohammed Al-Jadaan studied the latest figures. “A 7% cut,” he muttered, his voice barely audible over the shuffle of documents. The country’s budget for the next fiscal year had been trimmed to $264 billion—a strategic move aimed at narrowing a deficit that had widened amid plummeting oil prices and the pandemic-induced slowdown.

                        Outside the ministry, economic analysts debated the implications. “They’re targeting a deficit of 4.9% of GDP,” one expert explained to a journalist. “This means the gap between what the government earns and what it spends will shrink, but at the cost of reduced public expenditure.” For years, Saudi Arabia had been battling fiscal imbalances, ever since the global oil crash of 2014. Now, with a projected GDP growth of 3.2% in the coming year, there was cautious optimism.

                        Meanwhile, thousands of miles away in Kashmir, the mood was far grimmer. At a CRPF (Central Reserve Police Force) checkpoint in Sopore, the evening silence was shattered by sudden gunfire. Three personnel fell, two others injured in the ambush. “Second attack this week,” murmured a senior officer. In Pulwama, a trooper had already been wounded in a similar strike, and militants had previously targeted Special Police Officers, seizing their weapons in the rugged Dacchan region.

                        As security forces combed through the area, a tense calm hung in the air. Shopian’s Superintendent of Police, Amritpal Singh, surveyed the aftermath of another operation. “Two militants neutralized,” he reported. “But their identities remain unknown.”

                        On the Line of Control (LoC), the conflict simmered dangerously. The Indian Army’s statement was blunt—Pakistan had initiated unprovoked ceasefire violations across multiple sectors: Dawar, Keran, Uri, Naugam. Mortars thundered, rifle bursts echoing in the valleys. “We are responding,” a defense official assured. Intelligence sources hinted that among those killed on the Pakistani side were two elite commandos from the Special Service Group (SSG), an indication of the intensifying skirmishes.

                        At the External Affairs Ministry, spokesperson Anurag Srivastava reaffirmed India’s stance. “These violations aren’t random,” he told reporters. “They’re calculated moves to provide cover for infiltration attempts.” In the war of words and bullets, strategy and diplomacy played their endless game.

                        As the night deepened, somewhere in a military control room, blinking screens mapped conflict zones while economists debated Saudi Arabia’s fiscal future. The world moved forward, balancing between economic prudence and military vigilance—two sides of the same coin in an uncertain era.`,  
                        slug: 'defense-2020' 
                    }, 

                    {
                        id: 'defense-2021', 
                        title: '2021', 
                        l1: "India's defence budget has been steadily increasing, wih an average growth rate of 9% over the last decade. However, this is the lowest it has been since the early 1960s.", 
                        l2: `In a significant move, India has allocated a record-breaking defence budget of ₹6.21 lakh crore (lakh crore: one lakh crore is equal to one trillion, so ₹6.21 lakh crore is ₹6.21 trillion). This is an 11% increase from the previous year's allocation, reflecting the country's commitment to strengthening national security. The government aims to modernize the armed forces, procure advanced weapon systems, and enhance border security infrastructure. Defence analysts have praised the move, calling it a "strategic necessity" in the face of growing regional tensions.

                        At the same time, Prime Minister Narendra Modi made headlines with his statement about a "tea conspiracy", claiming that certain entities are sabotaging the Indian tea industry to benefit foreign competitors. He addressed tea planters in Assam, alleging that misinformation campaigns are being used to create panic among local growers.`,   
                        slug: 'defense-2021' 
                    }, 

                    {
                        id: 'defense-2024', 
                        title: '2024', 
                        l1: "The Indian Government has increased it's defense budget for 2024-25 to Rs 6.21 lakh crore, a significant 7.5% hike from the previous year's allocation of Rs 5.94 lakh crore.",  
                         l2: `February had just begun when Finance Minister Nirmala Sitharaman stood before Parliament, announcing the new defense budget of ₹6.21 lakh crore. Throughout the ministry corridors, there was a mixture of relief and contemplation—a 4.72% increase was modest compared to last year's 13.8% jump.

                        Colonel Sharma sat in his office reviewing the numbers. "Capital outlay (funds allocated for acquiring new equipment, weapons systems and infrastructure) at ₹1.72 lakh crore," he noted to his junior officer. "Not as much as we hoped, but we'll make it work."

                        Meanwhile, at the naval dockyard in Mumbai, Commander Patel walked along the massive hull of a domestically manufactured destroyer. The allocation of ₹23,800 crore for the naval fleet played in his mind. "Seven years ago, we couldn't even dream of building vessels like this in India," he told the shipyard manager. "Now we're planning to export ₹50,000 crore worth of defense equipment by 2028."

                        Across the country at the Defense Research and Development Organization, Dr. Mehra's team celebrated the announcement of the new deep-tech defense scheme (program focused on developing advanced military technologies like artificial intelligence, robotics, and quantum computing). "Quantum computing, advanced materials, AI-driven systems—finally, we can push the boundaries," she exclaimed while sketching plans on a whiteboard.

                        In the stock market, traders watched with interest as defense stocks fluctuated. "HAL down nearly two percent, but look at Astra Microwave Products climbing," remarked an analyst, tracking the immediate market response to the budget announcements.

                        The real impact, however, was being felt on naval vessels patrolling international waters. Lieutenant Commander Rao had just participated in an anti-piracy operation that rescued Pakistani and Iranian crew members from Somali pirates. "Our equipment performed perfectly," he reported back to headquarters. "The investments in maritime security are paying off."

                        Back in Delhi, Defense Minister Rajnath Singh addressed a gathering of industry leaders. "Seven years ago, defense exports didn't even touch ₹1,000 crore," he reminded them. "The path to atmanirbharta (self-reliance in defense manufacturing to reduce dependence on imports) isn't easy, but we're making steady progress."

                        Later that evening, Wing Commander Ahuja, one of the growing number of women in combat roles, prepared for a night training mission. The budget's emphasis on expanding women's participation in the armed forces had created opportunities that previous generations could only imagine.

                        As night fell across the nation, the Defense Acquisition Council (DAC - highest decision-making body for defense procurement in India) convened to review projects worth ₹84,560 crore—radar systems, torpedoes, and maritime aircraft that would soon strengthen India's defensive capabilities. The chairman looked around the room and nodded decisively. "The journey continues," he said. "One step at a time toward a self-reliant defense force."`,  
                        slug: 'defense-2024' 
                    }

                ]
            }, 

            {
                id: 'economic',
                label: 'Economic', 
                stories: [
                  {
                    id: 'publicprivate',
                    title: 'Public-Private Partnerships (PPPs) & Infrastructure Push', 
                    l1:
                      'The government is increasingly relying on Public-Private Partnerships (PPPs)—long-term collaborations between the government and private sector—to drive infrastructure growth.',
                    l2: "",  
                    slug: 'publicprivate',
                  },

                  {
                    id: 'fiscalprudence',
                    title: 'Fiscal Prudence & Market Borrowings', 
                    l1:
                    'Finance Minister Nirmala Sitharaman’s Interim Budget 2024-25 (a temporary budget before elections) emphasized fiscal prudence—responsible management of government finances—by reducing the fiscal deficit (the gap between government spending and revenue) to 5.1% of GDP, down from 5.8% in FY24.',  
                    l2: "",  
                    slug: 'fiscalprudence', 
                  }, 

                  {
                    id: 'statevscentre', 
                    title: 'State vs. Centre: Fiscal Tensions',  
                    l1:
                    'States like Karnataka, Kerala, and Tamil Nadu have protested against perceived unequal fund distribution, accusing the Centre of withholding rightful allocations. The Finance Commission (a constitutional body that decides how taxes are shared between Centre and states) has become a battleground, with southern states arguing they receive less despite contributing more in taxes.', 
                    l2: "",  
                    slug: 'statevscentre'   
                  },  

                  {
                    id: 'taxreforms', 
                    title: 'Tax Reforms & Middle-Class Relief', 
                    l1:
                    'The budget brought relief for middle-income earners under the new tax regime, with no tax for incomes up to ₹7 lakh. The highest surcharge (additional tax on high-income earners) was reduced from 37% to 25%, benefiting salaried employees. However, capital gains tax (levy on profits from asset sales) remained complex, leading to calls for further simplification.',  
                    l2: "", 
                    slug: 'taxreforms'    
                  },   

                ],
            },
              
            ],
          
    }
]