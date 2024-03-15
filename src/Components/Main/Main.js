import { useEffect, useState } from 'react';
import './Main.css'
import { GymCard } from '../GymCard/GymCard';

export const Main = () => {
    const [exerciseList, setExerciseList] = useState([])
    const [filteredList, setFilteredList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89274b4243mshaf8b81a32572bccp11ddb3jsn4fc8f2be01cd',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    async function getExcersiceData(){

        const url = `https://exercisedb.p.rapidapi.com/exercises?limit=1323`;

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            setExerciseList(result);
            setFilteredList(result);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
            getExcersiceData();
    },[])

    useEffect(()=>{

        const dataToSearchFor = searchInput.toLowerCase();

        setFilteredList(()=>{
            const data = exerciseList.filter((elem)=>{
                if(elem.bodyPart.includes(dataToSearchFor) || elem.target.includes(dataToSearchFor) || elem.name.includes(dataToSearchFor)){
                    return(true);
                }
            })
            return data;
        })
    },[searchInput])

  return (
    <div id='container'>
            <header>
                <h1>Exercise</h1>
                <div id='search-bar-container'>
                    <input type='text' placeholder='Search by body part or name' value={searchInput} onChange={(e)=>{
                        setSearchInput(e.target.value);
                    }}/>
                </div>
            </header>
            <div id='excersice-cards-container'>
                {
                    filteredList.map((elem)=>{
                        return(
                            <GymCard key ={elem.id} name = {elem.name} bodyPart = {elem.bodyPart} target = {elem.target} gifUrl = {elem.gifUrl} elem = {elem} />
                        )
                    })
                }
            </div>
        </div>
  )
}
