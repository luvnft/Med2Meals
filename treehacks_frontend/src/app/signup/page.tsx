"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


interface signUpData {
    username: string;
    password: string;

    american: boolean;
    chinese: boolean; 
    french: boolean;
    indian: boolean;
    italian: boolean;
    japanese: boolean;
    korean: boolean;
    mexican: boolean;
    thai: boolean;
    vietnamese: boolean;

    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;

    proteinGoal?: number;
    calorieGoal?: number;
}

type Step = "credential" | "cuisine" | "restriction" | "goal" | "terra" | "complete"

export default function page() {
    const [step, setStep] = useState<Step>('credential');
    const [userid, setUserid] = useState<string>("" as string);
    const [signUpData, setSignUpData] = useState<signUpData>({} as signUpData);

    const router = useRouter();

    function handleInfoUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const field = e.target.name as keyof signUpData;
        
        setSignUpData(prevState => ({
            ...prevState, 
            [field]: e.target.value
        }));
    }

    function handleCheckboxUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const field = e.target.name as keyof signUpData;
        
        setSignUpData(prevState => ({
            ...prevState, 
            [field]: !prevState[field]
        }));
    }

    function saveAndContinue() {
        // make api call to save all the thing in the database
        // return userid from the api call
        // setUserid(userid)

        setStep("terra")
    }

    useEffect(() => {
        if(step === "terra") {
            terraSessionInitiation()
        }
    }, [step])

    async function terraSessionInitiation() {
        const terraApi = process.env.NEXT_PUBLIC_TERRA_API_KEY || "";
        const terraDevId = process.env.NEXT_PUBLIC_TERRA_DEVELOPER_ID || "";
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'dev-id': terraDevId,
              'content-type': 'application/json',
              'x-api-key': terraApi,
            },
            body: JSON.stringify({
              providers: 'GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR',
              language: 'en',
              use_terra_avengers_app: false,
              auth_success_redirect_url: `http://localhost:3000/succsess?localuserid=${userid}`,
            })
          };
          
        const response = await fetch('https://api.tryterra.co/v2/auth/generateWidgetSession', options)
        const data = await response.json()
        
        if( !response.ok ) {
            console.error(data)
            return;
        }

        router.push(data.url)
        
        // .then(response => response.json())
            // .then(response => console.log(response))
            // .catch(err => console.error(err));
    }

    function onboard(){
        switch(step) {
            case 'credential':
                return(
                    <div className="flex flex-col gap-8 items-center">
                        <input type="text" defaultValue={""} placeholder="Username" name='username' value={signUpData.username} onChange={handleInfoUpdate} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                        <input type="password" defaultValue={""} placeholder="Password" name='password' value={signUpData.password} onChange={handleInfoUpdate} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                        <button className="w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center" onClick={() => {setStep("cuisine")}}>Sign up</button>
                    </div>
                )
            case 'cuisine':
                return (
                    <>
                        <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your favorite cuisine?</h3>
                        <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='american' name='american' value='american' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="american">🇺🇸 American</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='chinese' name='chinese' value='chinese' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="chinese">🇨🇳 Chinese</label><br></br>
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='french' name='french' value='french' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='French'>🇫🇷 French</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='indian' name='indian' value='indian' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Indian'>🇮🇳 Indian</label><br></br>
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='italian' name='italian' value='italian' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Italian'>🇮🇹 Italian</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='japanese' name='japanese' value='japanese' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Japanese'>🇯🇵 Japanese</label><br></br>
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='korean' name='korean' value='korean' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Korean'>🇰🇷 Korean</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='mexican' name='mexican' value='mexican' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Mexican'>🇲🇽 Mexican</label><br></br>
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='thai' name='thai' value='thai' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Thai'>🇹🇭 Thai</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='vietnamese' name='vietnamese' value='vietnamese' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor='Vietnamese'>🇻🇳 Vietnamese</label><br></br>
                                </div>
                            </div>
                        </div>
                        <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={() => (setStep("restriction"))}>Next</button>
                    </>
                )
            case 'restriction':
                return (
                    <>
                        <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your dietry restriction?</h3>
                        <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='vegan' name='vegan' value='vegan' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="vegan">Vegan</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='vegetarian' name='vegetarian' value='vegetarian' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="vegetarian">Vegetarian</label><br></br>
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='w-36'>
                                    <input type='checkbox' id='glutenFree' name='glutenFree' value='glutenFree' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="glutenFree">Gluten Free</label>
                                </div>
                                <div className='w-36'>
                                    <input type='checkbox' id='noresetriction' name='norestriction' value='norestriction' onChange={handleCheckboxUpdate}/>
                                    <label htmlFor="none">None</label>
                                </div>
                            </div>
                        </div>
                        <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={() => {setStep("goal")}}>Next</button>
                    </>
                )
            case 'goal':
                return (
                    <>
                        <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your dietery goal?</h3>
                        <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
                            <div className='flex flex-col gap-8 w-10/12'>
                                <div>
                                    <p>Protein Goal</p>
                                    <input 
                                        type="number"
                                        placeholder="Grams of protein (optional)"
                                        value={signUpData.proteinGoal}
                                        className='w-full'
                                        name = "proteinGoal"
                                        onChange={handleInfoUpdate}
                                    />
                                </div>

                                <div>
                                    <p>Calorie Goal/limit</p>
                                    <input
                                        type="number"
                                        placeholder="Calorie amount (optional)" 
                                        value={signUpData.calorieGoal}
                                        className='w-full'
                                        name = "calorieGoal"
                                        onChange={handleInfoUpdate}  
                                    />
                                </div>
                            </div>
                        </div>
                        <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={saveAndContinue} >Next</button>
                    </>
                )
            case 'terra':
                return (
                    <>
                        <div>terra</div>
                    </>
                )
            default:
                return <> </>
        }
    }
        
    return (
        <div>
            <div className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]">
                <h1 className="text-6xl font-bold text-white">Treehacks</h1>
                { onboard() }
            </div>
        </div>
    )
}
