interface HeadingProps {
  title: string
  description: string
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  )
}

export default Heading
