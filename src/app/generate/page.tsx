'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {INavigation, IUserNavigation, IStatsType} from "@/types";
import Announcements from "@/components/Announcements";
import GenerateServiceForm from "@/app/generate/GenerateServiceForm";
import WelcomePanel from "@/components/WelcomePanel";


export const metadata = {
  title: 'KATA Whitebelt | Generate Service',
  description: 'Welcome to KATA Whitebelt',
};

const navigation: INavigation[] = [
  {name: 'Home', href: '/', current: false},
  {name: 'Create', href: '/create', current: false},
  {name: 'Resources', href: '/resources', current: false},
  {name: 'Generate', href: '/generate', current: true},
  {name: 'Settings', href: '/settings', current: false},
]

const stats: IStatsType[] = [
  {label: 'Services Generated', value: 12},
  {label: 'KATA Applications Created', value: 4},
  {label: 'Man days saved', value: 100},
]

export default function Resources() {

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
                  {/* Welcome panel */}
                  <WelcomePanel stats={stats} />
                  <section>
                    <div>
                      <GenerateServiceForm />
                    </div>
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
