import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recentUpdates, stats } from '@/constants/generalConstants';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
const DashboardPage = () => {


    return (
        <div className="space-y-8 ">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
                <p className="text-muted-foreground">Here's what's happening with your restaurant today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p
                                className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                                    } flex items-center`}
                            >
                                {stat.changeType === "positive" ? (
                                    <ArrowUp className="mr-1 h-4 w-4" />
                                ) : (
                                    <ArrowDown className="mr-1 h-4 w-4" />
                                )}
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Updates</CardTitle>
                        <CardDescription>Your latest changes and activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentUpdates.map((update) => (
                                <div key={update.id} className="flex items-center">
                                    <div className="relative h-16 w-16 shrink-0">

                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{update.title}</p>
                                        <p className="text-sm text-muted-foreground">{update.description}</p>
                                        <p className="text-xs text-muted-foreground">{update.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">
                            View all updates
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Website Preview</CardTitle>
                        <CardDescription>How your site looks to visitors</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost">Edit Site</Button>
                        <Button>View Live Site</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;