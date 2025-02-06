import {Button } from '../components/Button';
import {PlusIcon} from "../icons/PlusIcon";
import {ShareIcon} from "../icons/ShareIcon";
import {Card} from "../components/Card";
import { CreateContentModel } from '../components/CreateContentModel';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(true);

  return  <div>
    <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
        <CreateContentModel open={modalOpen} onClose={()=>setModalOpen(false)}/>
        <div className="flex justify-end gap-4">
        <Button onClick={()=>{
          setModalOpen(true);
        }} variant ="primary" text="Add Content" startIcon={<PlusIcon/>}>
        </Button>
        <Button variant ="secondary" text="Share brain" startIcon={<ShareIcon/>}>
        </Button>

        </div>

        <div className="flex gap-4">
        <Card type="twitter" link="https://x.com/kirat_tw/status/1633685473821425666" title="First tweet" />
        <Card type="youtube" link="https://www.youtube.com/watch?v=Oo3qsxihXqY" title="First video" />
      </div>
   </div>
  
   </div>
    
   
  
}

