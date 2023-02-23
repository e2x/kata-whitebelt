'use client';

import {useEffect, useState} from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {INavigation, IUserNavigation, IStatsType} from "@/types";
import Announcements from "@/components/Announcements";
import Card from "@/components/Card";
import WelcomePanel from "@/components/WelcomePanel";


export const metadata = {
  title: 'KATA Whitebelt | Resources',
  description: 'Welcome to KATA Whitebelt',
};

const navigation: INavigation[] = [
  {name: 'Home', href: '/', current: false},
  {name: 'Create', href: '/create', current: false},
  {name: 'Resources', href: '/resources', current: true},
  {name: 'Generate', href: '/generate', current: false},
  {name: 'Settings', href: '/settings', current: false},
]

const stats: IStatsType[] = [
  {label: 'Services Generated', value: 12},
  {label: 'KATA Applications Created', value: 4},
  {label: 'Man days saved', value: 100},
]

export default function Resources() {
  const [services, setServices] = useState({services: []})
  useEffect(() => {
    const servicesData = async () => {
      const res = await getData()
      setServices(res);
    }
    servicesData();
  }, []);

  useEffect(() => {
    document.title = metadata.title
  }, []);

  return (
      <>
        <div className="min-h-full bg-gray-300">
          <Header navigation={navigation}/>
          <main className="-mt-24 pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-full lg:px-8">
              <h1 className="sr-only">Profile</h1>
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  <WelcomePanel stats={stats} />
                  <section>
                    <Card
                        imageUrl={"https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"}
                        title={"Implemented KATA Services"}
                        subtitle={"We’re here to help"}
                        data={services && services?.services?.map((s: { service: string }) => {
                          console.log(s.service)
                          return <div key={s.service}>{s.service}</div>
                        })}
                    />

                  </section>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Announcements/>
                </div>
              </div>
            </div>
          </main>
          <Footer/>
        </div>
      </>
  )
}

async function getData() {
  const res = await fetch('http://localhost:8089/v1/service');

  return await res.json();
}