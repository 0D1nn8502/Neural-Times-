
export interface Category {
    id: string;
    label: string;
    subtopics: SubTopic[];
}
  

export interface L2Story {
    id: string; 
    title: string; 
    l1: string; 
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
                        slug: 'defense-2020' 
                    }, 

                    {
                        id: 'defense-2021', 
                        title: '2021', 
                        l1: "India's defence budget has been steadily increasing, wih an average growth rate of 9% over the last decade. However, this is the lowest it has been since the early 1960s.",  
                        slug: 'defense-2021' 
                    }, 

                    {
                        id: 'defense-2024', 
                        title: '2024', 
                        l1: "The Indian Government has increased it's defense budget for 2024-25 to Rs 6.21 lakh crore, a significant 7.5% hike from the previous year's allocation of Rs 5.94 lakh crore.",  
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
                    slug: 'publicprivate',
                  },

                  {
                    id: 'fiscalprudence',
                    title: 'Fiscal Prudence & Market Borrowings', 
                    l1:
                    'Finance Minister Nirmala Sitharaman’s Interim Budget 2024-25 (a temporary budget before elections) emphasized fiscal prudence—responsible management of government finances—by reducing the fiscal deficit (the gap between government spending and revenue) to 5.1% of GDP, down from 5.8% in FY24.',  
                    slug: 'fiscalprudence', 
                  }, 

                  {
                    id: 'statevscentre', 
                    title: 'State vs. Centre: Fiscal Tensions',  
                    l1:
                    'States like Karnataka, Kerala, and Tamil Nadu have protested against perceived unequal fund distribution, accusing the Centre of withholding rightful allocations. The Finance Commission (a constitutional body that decides how taxes are shared between Centre and states) has become a battleground, with southern states arguing they receive less despite contributing more in taxes.', 
                    slug: 'statevscentre'   
                  },  

                  {
                    id: 'taxreforms', 
                    title: 'Tax Reforms & Middle-Class Relief', 
                    l1:
                    'The budget brought relief for middle-income earners under the new tax regime, with no tax for incomes up to ₹7 lakh. The highest surcharge (additional tax on high-income earners) was reduced from 37% to 25%, benefiting salaried employees. However, capital gains tax (levy on profits from asset sales) remained complex, leading to calls for further simplification.',  
                    slug: 'taxreforms'    
                  },   

                ],
            },
              
            ],
          
    }
]