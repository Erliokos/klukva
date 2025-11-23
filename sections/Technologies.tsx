'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { technologies } from '@/lib/content'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp, staggerChildren } from '@/lib/motion'
import NextLogo from '@/public/assets/tech/next_logo.svg'
import ReactLogo from '@/public/assets/tech/react_logo.svg'
import NodeLogo from '@/public/assets/tech/node_logo.svg'
import TsLogo from '@/public/assets/tech/ts_logo.svg'
import VueLogo from '@/public/assets/tech/vue_logo.svg'
import SvelteLogo from '@/public/assets/tech/svelte_logo.svg'
import GraphLogo from '@/public/assets/tech/graph_logo.svg'
import PostgresLogo from '@/public/assets/tech/postgres_logo.svg'
import MongoLogo from '@/public/assets/tech/mongo_logo.svg'
import DockerLogo from '@/public/assets/tech/docker_logo.svg'
import AwsLogo from '@/public/assets/tech/aws_logo.svg'
import GitlabLogo from '@/public/assets/tech/gitlab_logo.svg'
import NestLogo from '@/public/assets/tech/nest_logo.svg'
import VercelLogo from '@/public/assets/tech/vercel_logo.svg'

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'rgba(15, 17, 28, 0.5)'
      : 'rgba(246, 247, 251, 0.5)'};
`

const LogoNext = styled(NextLogo)`
  width: 64px;
  height: 64px;
  fill: ${({ theme }) => theme.colors.muted};
`

const LogoReact = styled(ReactLogo)`
  width: 64px;
  height: 64px;
`
const LogoNode = styled(NodeLogo)`
  width: 64px;
  height: 64px;
`
const LogoTS = styled(TsLogo)`
  width: 64px;
  height: 64px;
`
const LogoVue = styled(VueLogo)`
  width: 64px;
  height: 64px;
`
const LogoSvelte = styled(SvelteLogo)`
  width: 64px;
  height: 64px;
`
const LogoGraph = styled(GraphLogo)`
  width: 64px;
  height: 64px;
`
const LogoPostgres = styled(PostgresLogo)`
  width: 64px;
  height: 64px;
`
const LogoMongo = styled(MongoLogo)`
  width: 64px;
  height: 64px;
`
const LogoDocker = styled(DockerLogo)`
  width: 64px;
  height: 64px;
`
const LogoAws = styled(AwsLogo)`
  width: 64px;
  height: 64px;
`
const LogoGitlab = styled(GitlabLogo)`
  width: 64px;
  height: 64px;
`
const LogoNest = styled(NestLogo)`
  width: 64px;
  height: 64px;
`
const LogoVercel = styled(VercelLogo)`
  width: 64px;
  height: 64px;
  fill: ${({ theme }) => theme.colors.muted};
`

const Grid = styled(motion.div)`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
`

const TechCard = styled(motion.div)`
  border-radius: ${({ theme }) => theme.sizes.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }
`

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`

const TechName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`

const TechCategory = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

// SVG иконки для технологий
const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    'Next.js': <LogoNext />,
    React: <LogoReact />,
    TypeScript: <LogoTS/>,
    'Node.js': <LogoNode />,
    'Vue.js': <LogoVue/>,
    Svelte: <LogoSvelte/>,
    GraphQL: <LogoGraph/>,
    PostgreSQL: <LogoPostgres/>,
    MongoDB: <LogoMongo/>,
    Docker: <LogoDocker/>,
    AWS: <LogoAws/>,
    Nest: <LogoNest/>,
    Vercel: <LogoVercel/>,
    Gitlab: <LogoGitlab/>
  }

  return (
    <IconWrapper>
      {icons[name] || (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'currentColor'
          }}
        >
          {name.charAt(0)}
        </div>
      )}
    </IconWrapper>
  )
}

export const Technologies = () => (
  <Section id="technologies">
    <SectionHeading
      title="Технологии"
      description="Используем современный стек инструментов для создания быстрых, масштабируемых и надёжных решений."
    />
    <Grid
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {technologies.map(tech => (
        <TechCard
          key={tech.name}
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <TechIcon name={tech.name} />
          <TechName>{tech.name}</TechName>
          <TechCategory>{tech.category}</TechCategory>
        </TechCard>
      ))}
    </Grid>
  </Section>
)
