import React from 'react'

const Order = () => {
    return (
        <div name="contact" className='w-full h-full bg-gradient-to-b from-black to-gray-800 text-white '>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
                <div className='pb-8 flex justify-center align-center'>
                    <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
                        Commande
                    </p>
                </div>
                <div className='flex justify-center align-center'>
                    <p className='py-3'>Veillez entrer vos informations de commande</p>
                </div>
                <div className='flex justify-center items-center'>
                    <form action='https://getform.io/f/d4664ca1-c2b8-4c9b-b21d-f2a151c88288'
                        className='flex flex-col w-full md:w-1/2' method='POST'
                        enctype="multipart/form-data">

                        <input type="text" name="name" placeholder="Entrer votre nom complet"
                            className='p-2 bg-transparent border-2 rounded-md
                 text-white focus:outline-none mt-10'
                            required
                        />

                        <input type="number" name="number" placeholder="Entrer votre numero de téléphone"
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none my-3'
                            required
                        />
                        <input type="text" name="text" placeholder="Votre Adresse/ville/rue"
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none my-3'
                            required
                        />
                        <input type="file" name="file" placeholder="Importez le ficher téléchargé"
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none my-3'
                            required
                        />

                        <textarea
                            rows="10"
                            name="message"
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
                            placeholder="informations complémentaires si possible"
                        >
                        </textarea>

                        <div className='flex align-center justify-center'>
                            <button
                                className='text-white justify-center bg-gradient-to-b
                    from-cyan-500 to-blue-500 px-6 py-3 my-8
                    nx-auto flex items-center rounded-md hover:scale-110 duration-300 w-full'
                                type='submit'>
                                Terminer la commande
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Order