'use client';

import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {INavigation, IUserNavigation, IStatsType} from "@/types";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import CreateLottie from '@/components/lottie/Create';
import GenerateLottie from '@/components/lottie/Generate';
import SettingsLottie from '@/components/lottie/Settings';
import {useState} from "react";
import WelcomePanel from "@/components/WelcomePanel";

export const metadata = {
  title: 'KATA Whitebelt | Home',
  description: 'Welcome to KATA Whitebelt',
};

const navigation: INavigation[] = [
  {name: 'Home', href: '/', current: true},
  {name: 'Create', href: '/create', current: false},
  {name: 'Resources', href: '/resources', current: false},
  {name: 'Generate', href: '/generate', current: false},
  {name: 'Settings', href: '/settings', current: false},
]

const stats: IStatsType[] = [
  {label: 'Services Generated', value: 12},
  {label: 'KATA Applications Created', value: 4},
  {label: 'Man days saved', value: 100},
]

export default function Home() {
  const [playCreate, setPlayCreate] = useState<boolean>(false);
  const [playGenerate, setPlayGenerate] = useState<boolean>(false);
  const [playSettings, setPlaySettings] = useState<boolean>(false);

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

                  {/* Actions panel */}
                  <section aria-labelledby="quick-links-title">
                    <div
                        className="p-4 divide-y h-96 divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow">
                      <h2 className="sr-only" id="quick-links-title">
                        Quick links
                      </h2>

                      <div className="">
                        <ul className="h-full items-center grid grid-cols-3 gap-x-6 gap-y-12 space-y-0">
                          <li
                              data-test="create-container"
                              className="h-full "
                              key="create"
                              onMouseEnter={() => setPlayCreate(true)}
                              onMouseLeave={() => setPlayCreate(false)}
                              onFocus={() => setPlayCreate(true)}
                              onBlur={() => setPlayCreate(false)}
                          >
                            <Link href="/create">
                              <FeatureCard
                                  data-test="create-feature-card"
                                  image={<CreateLottie data-test="lottie" play={playCreate} />}
                                  title="Create new KATA Application"
                                  text="Use the UI to create new KATA Applications locally"
                                  help="Create new applications will all the supporting software such as monitoring, API Gateway, Service Mesh and cloud configuration."
                              />
                            </Link>
                          </li>
                          <li
                              className="h-full"
                              key="gen"
                              data-test="generate-container"
                              onMouseEnter={() => setPlayGenerate(true)}
                              onMouseLeave={() => setPlayGenerate(false)}
                              onFocus={() => setPlayGenerate(true)}
                              onBlur={() => setPlayGenerate(false)}
                          >
                            <Link href="/generate">
                              <FeatureCard
                                  image={<GenerateLottie play={playGenerate} />}
                                  title="Generate Services"
                                  text="Generate services from the KATA Open API service definitions"
                                  help="This function will allow you to create front end or back end services basked off the specifications described in you service YAML."
                              />
                            </Link>
                          </li>
                          <li
                              className="h-full"
                              key="settings"
                              data-test="settings-container"
                              onMouseEnter={() => setPlaySettings(true)}
                              onMouseLeave={() => setPlaySettings(false)}
                              onFocus={() => setPlaySettings(true)}
                              onBlur={() => setPlaySettings(false)}
                          >
                            <Link href="/settings">
                              <FeatureCard
                                  image={<SettingsLottie play={playSettings} />}
                                  title="Settings"
                                  text="Application settings"
                                  help="Settings for the application"
                              />
                            </Link>
                          </li>
                        </ul>
                      </div>

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
