const Advice = () => {
    return (
        <div className='bg-yellow-100 text-slate-500 max-w-2xl my-6 px-3 py-2 text-sm shadow-sm rounded-lg border border-slate-200'>
            <p>Wie schön, dass du dein Wissen mit deinen Kolleg:innen teilst!</p>
            <p className='mt-3'>Hier ein paar Hinweise für deine Antwort:</p>
            <ul className="list-disc px-4 leading-relaxed">
                <li>Bitte achte darauf, dass du die Frage tatsächlich beantwortest.</li>
                <li>Formuliere deine Antwort möglichst konkret und praxisbezogen.</li>
                <li>Versetze dich in deine Kolleg:innen: Können sie mit Hilfe deiner Antwort weiterarbeiten? Das sollte das Ziel deiner Antwort sein.</li>
            </ul>
        </div>
    );
}

export default Advice;