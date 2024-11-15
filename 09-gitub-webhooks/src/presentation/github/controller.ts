import { Request, Response } from "express";
import { GitHubService, DiscordService } from "../services";


export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ){}


    webhookHandler = (request: Request, response: Response) => {
        
        const githubEvent = request.header('x-github-event') ?? 'unknown'
        const payload = request.body;

        let message:string;

        switch( githubEvent ) {
            case 'star':
                message = this.githubService.onStar( payload );
                break;
            case 'issues':
                message = this.githubService.onIssue(payload);
                break;
            default:
                message = `Unknown event ${ githubEvent }`;
      
        }

        this.discordService.notify(message)
            .then( () => response.status(202).send('Accepted') )
            .catch( () => response.status(500).json({ error: 'internal server error'}) )
        
        
        
        response.status(202).send("Accepted")
    }

}