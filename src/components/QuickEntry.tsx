import UploadCard from './UploadCard'

export default function QuickEntry() {
    const steps = [
        {
            title: 'Passo 1: Suas Informacoes de Contato',
            body: 'Insira seu e-mail para se cadastrar e para que possamos entrar em contato quando voce ganhar!',
        },
        {
            title: 'Passo 2: Envie Sua Selfie',
            body: 'Tire uma selfie ou uma foto com um amigo e faca o upload direto da sua galeria.',
        },
        {
            title: 'Passo 3: Envie e Participe',
            body: "Clique em 'Enviar' e voce recebera imediatamente um link para baixar o app no e-mail cadastrado.",
        },
    ]

    return (
        <section className="mx-auto w-full max-w-screen-xl overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10">
            <div className="grid w-full max-w-full items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] md:gap-8">
                <div className="w-full min-w-0 space-y-4">
                    {steps.map((step, index) => (
                        <article
                            key={step.title}
                            className="rounded-lg border border-slate-200 bg-white p-4 shadow-card sm:p-5"
                        >
                            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                                {index + 1}
                            </div>
                            <h2 className="text-lg font-semibold leading-snug text-slate-950">
                                {step.title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                                {step.body}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="w-full min-w-0 space-y-4">
                    <div className="animate-fadeIn w-full max-w-full overflow-x-hidden">
                        <UploadCard />
                    </div>

                    <div className="rounded-lg border border-brand/20 bg-brand-light p-4 text-sm leading-6 text-slate-700">
                        <p className="mb-1 flex items-center gap-2 font-semibold text-slate-950">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-brand"
                                aria-hidden="true"
                            >
                                <path fillRule="evenodd" d="M12 2a10 10 0 00-10 10v3.25A2.75 2.75 0 004.75 18H7a5 5 0 0010 0h2.25A2.75 2.75 0 0022 15.25V12A10 10 0 0012 2zM9.75 9.75a.75.75 0 011.5 0V12a.75.75 0 01-1.5 0V9.75zm3.75 0a.75.75 0 011.5 0V12a.75.75 0 01-1.5 0V9.75z" clipRule="evenodd" />
                            </svg>
                            Promessa de Privacidade
                        </p>
                        <p>
                            Suas informacoes sao completamente confidenciais e usadas apenas para este concurso.
                            Respeitamos seus dados e nao os compartilharemos com terceiros.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
