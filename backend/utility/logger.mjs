class Logger {
    log(msg){
         console.log(`[${new Date().toLocaleString().green}] `,msg);
    }

    classTypeLogger(className){
        console.log("\n");
        console.log(className.constructor.name.blue,":Loaded ✓".green)
    }

    pathLogger(path, handlers){
        console.log("Route path:",path);
        console.log("Route handler",handlers.map(h =>  h));
    }

    async routerLogger(file, time){
        setTimeout(()=>{
            console.log(`Router loaded: ${file}`);
        },time)
    }

    errorLogger(err, msg, res, stcode, jmsg){
        console.error(msg, err);
        return res.status(stcode).json({ message: jmsg });
    }

    typeLog(a){
        console.log(`The Type of ${a} is`,typeof(a));
    }
}
export default new Logger();
