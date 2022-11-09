import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession} from 'next-auth/react'

import {trpc} from '@utils/trpc'

import {type NextPage} from 'next'

const Home: NextPage = () => {
	const hello = trpc.example.hello.useQuery({text: 'from tRPC'})

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto flex min-h-screen flex-col items-center justify-center p-4'>
				<Link href='https://github.com/riolly/create-t3-app/' target='_blank'>
					<h1 className='text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]'>
						Create{' '}
						<Image
							className='-mx-2 inline align-text-bottom'
							width={112}
							height={112}
							src='/mstile-144x144.png'
							alt='T3'
						/>{' '}
						App
					</h1>
				</Link>
				<p className='mb-4 -mt-2 text-xl'>
					Riolly&apos;s opinionated version of&nbsp;
					<Link
						href='https://create.t3.gg/'
						className='font-highlight underline decoration-blue-300 underline-offset-4'
					>
						create-t3-app
					</Link>
				</p>
				<p className='text-2xl text-gray-700'>This stack uses:</p>
				<div className='mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3'>
					<TechnologyCard
						name='NextJS'
						description='The React framework for production'
						documentation='https://nextjs.org/'
					/>
					<TechnologyCard
						name='TypeScript'
						description='Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale'
						documentation='https://www.typescriptlang.org/'
					/>
					<TechnologyCard
						name='TailwindCSS'
						description='Rapidly build modern websites without ever leaving your HTML'
						documentation='https://tailwindcss.com/'
					/>
					<TechnologyCard
						name='tRPC'
						description='End-to-end typesafe APIs made easy'
						documentation='https://trpc.io/'
					/>
					<TechnologyCard
						name='Next-Auth'
						description='Authentication for Next.js'
						documentation='https://next-auth.js.org/'
					/>
					<TechnologyCard
						name='Prisma'
						description='Build data-driven JavaScript & TypeScript apps in less time'
						documentation='https://www.prisma.io/docs/'
					/>
				</div>
				<div className='flex w-full items-center justify-center pt-6 text-2xl text-blue-500'>
					{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
				</div>
				<AuthShowcase />
			</main>
		</>
	)
}

export default Home

const AuthShowcase: React.FC = () => {
	const {data: sessionData} = useSession()

	const {data: secretMessage} = trpc.auth.getSecretMessage.useQuery(
		undefined, // no input
		{enabled: sessionData?.user !== undefined}
	)

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			{sessionData && (
				<p className='text-2xl text-blue-500'>
					Logged in as {sessionData?.user?.name}
				</p>
			)}
			{secretMessage && (
				<p className='text-2xl text-blue-500'>{secretMessage}</p>
			)}
			<button
				className='rounded-md border border-black bg-sky-50 px-4 py-2 text-xl shadow-lg hover:bg-sky-100'
				onClick={sessionData ? () => signOut() : () => signIn()}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</button>
		</div>
	)
}

type TechnologyCardProps = {
	name: string
	description: string
	documentation: string
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
	name,
	description,
	documentation,
}) => {
	return (
		<section className='flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105'>
			<h2 className='text-lg text-gray-700'>{name}</h2>
			<p className='text-sm text-gray-600'>{description}</p>
			<Link
				className='m-auto mt-3 w-fit text-sm text-sky-500 underline decoration-dotted underline-offset-2'
				href={documentation}
				target='_blank'
				rel='noreferrer'
			>
				Documentation
			</Link>
		</section>
	)
}
