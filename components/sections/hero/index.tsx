'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

import HeroVideoDialog from '@/components/sections/hero/hero-video'
import { NumberTicker } from '@/components/number-ticker'

import { LuStar, LuHeart } from 'react-icons/lu'
import StarIcon from '@/components/star-icon'
import HeartIcon from '@/components/hearth-icon'
import { AnimatedTooltip } from '@/components/animated-tooltip'

const ease = [0.16, 1, 0.3, 1]

function HeroPill() {
  const [stats, setStats] = useState({
    stars: 0,
    lastUpdate: '',
  })

  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'

    const minutes = Math.floor(diffInSeconds / 60)
    if (diffInSeconds < 3600)
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`

    const hours = Math.floor(diffInSeconds / 3600)
    if (diffInSeconds < 86400)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`

    const days = Math.floor(diffInSeconds / 86400)
    if (diffInSeconds < 604800)
      return `${days} ${days === 1 ? 'day' : 'days'} ago`

    const weeks = Math.floor(diffInSeconds / 604800)
    if (diffInSeconds < 2592000)
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`

    const months = Math.floor(diffInSeconds / 2592000)
    if (diffInSeconds < 31536000)
      return `${months} ${months === 1 ? 'month' : 'months'} ago`

    const years = Math.floor(diffInSeconds / 31536000)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const repoResponse = await fetch(
          'https://api.github.com/repos/hasanharman/form-builder',
        )
        const repoData = await repoResponse.json()

        const lastUpdateDate = new Date(repoData.pushed_at)

        setStats({
          stars: repoData.stargazers_count,
          lastUpdate: getRelativeTime(lastUpdateDate),
        })
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      }
    }

    fetchGitHubData()
  }, [])

  const sponsors = [
    {
      id: 1,
      name: 'Maxim Ciebiera',
      designation: 'Founder - datatino.de',
      image: 'https://avatars.githubusercontent.com/u/47557243?v=4',
    },
    {
      id: 2,
      name: 'Radu Ciocan',
      designation: 'React Native Developer',
      image: 'https://avatars.githubusercontent.com/u/4984377?v=4',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center"
    >
      <div className="space-y-3">
        <p className="text-center text-xs text-muted-foreground">
          Last Update {stats.lastUpdate}
        </p>
        
      </div>
    </motion.div>
  )
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {['Build', 'Forms', 'Faster'].map((text, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center leading-7 text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        Create forms with{' '}
        <Link
          href="https://ui.shadcn.com/"
          target="_blank"
          className="hover:underline"
        >
          Rahul
        </Link>
        ,{' '}
        <Link
          href="https://react-hook-form.com/"
          target="_blank"
          className="hover:underline"
        >
          react-hook-form
        </Link>{' '}
        and{' '}
        <Link
          href="https://zod.dev/"
          target="_blank"
          className="hover:underline"
        >
          zod
        </Link>{' '}
        within minutes.
      </motion.p>
    </div>
  )
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href="/playground"
          className={cn(
            buttonVariants({ variant: 'gooeyLeft' }),
            'w-full sm:w-auto text-background flex gap-2 rounded-full',
          )}
        >
          {/* <Icons.logo className="h-6 w-6" /> */}
          Go to Playground
        </Link>
      </motion.div>
      {/* <motion.p
        className="mt-5 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        7 day free trial. No credit card required.
      </motion.p> */}
    </>
  )
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
    
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-16 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  )
}
