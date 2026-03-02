import React from 'react'
import Header from './components/Header'
import HeroSection from './sections/HeroSection'
import JobGrid from './sections/JobGrid'
import Talent from './sections/Talent'
import WhyChooseUs from './sections/WhyChooseUs'


const App = () => {

   const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  return (
    <div>
           <Header/>
           <HeroSection
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <JobGrid
        searchTitle={searchTitle}
        searchLocation={searchLocation}
        jobsData={jobsData}
      />
          <Talent/>
          <WhyChooseUs/>
    </div>
  )
}

export default App