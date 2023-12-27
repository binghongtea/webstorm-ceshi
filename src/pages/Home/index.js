import BarChart from "@/pages/Home/components/BarChart";

const Home = ()=>{

    return <div><BarChart title='三大框架满意度' xData={['Vue', 'React', 'Angular']}/>
        <BarChart title='三大框架使用度' xData={['React', 'Angular', 'Vue']}/></div>
}

export default Home