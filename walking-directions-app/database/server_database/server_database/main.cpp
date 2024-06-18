#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma comment(lib, "Ws2_32.lib")
#include <stdio.h>
#include <WinSock2.h>
#include <Ws2tcpip.h>
#include <iostream>
#include "command_parser.h"
#include "RouteMap.h"
#include "RouteInfoNode.h"


void run_tests();

int main()
{
    SOCKET wsocket;
    SOCKET new_wsocket;
    WSADATA wsaData;
    struct sockaddr_in server;
    int server_len;
    int BUFFER_SIZE = 30720;

    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
    {
        std::cout << "could not initialize server" << std::endl;
    }

    // create a socket
    wsocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (wsocket == INVALID_SOCKET)
    {
        std::cout << "Could not create socket" << std::endl;
    }

    // bind socket to address
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    server.sin_port = htons(8080);
    server_len = sizeof(server);

    if (bind(wsocket, (SOCKADDR*)&server, server_len) != 0)
    {
        std::cout << "Could not bind socket" << std::endl;
    }

    // listen to adress
    if (listen(wsocket, 250) != 0)
    {
        std::cout << "could not start listening" << std::endl;
    }

    // DatabaseServer database;

    std::cout << "Listening on 127.0.0.1:8080" << std::endl;

     int bytes = 0;

    // temp build and report
    RouteMap* pullman_routes = new RouteMap;


    while (true)
    {
        // accept client request
        new_wsocket = accept(wsocket, (SOCKADDR*)&server, &server_len);
        if (new_wsocket == INVALID_SOCKET)
        {
            std::cout << "Could not accept" << std::endl;
        }

        //read request
        char buff[30720] = { 0 };
        bytes = recv(new_wsocket, buff, BUFFER_SIZE, 0);
        if (bytes < 0)
        {
            std::cout << "Could not read client data" << std::endl;
        }
        std::string client_request(buff);


        Command_Parser server_parser(client_request);

        // parse and build response
        //std::string serverMessage = "HTTP/1.1 200 OK\nContent=Type: text/html\nContent-Length: ";

        int index = server_parser.find_cmd_index();
        /*RouteMap pullman_routes;*/
        std::map< std::string, std::vector<std::string>> all_comments;
        std::map<std::string, std::vector<float>> report;
        float rating = 0.0;
        std::string action_taken = "";

        switch (index)
        {
        case 0:
            all_comments = pullman_routes->get_all_comments();
            action_taken = "Got Comments";
            break;

        case 1:
            pullman_routes->add_record(server_parser.get_route_name(), server_parser.get_comment(), server_parser.get_rating(), server_parser.get_flag());
            action_taken = "Added Record";
            break;

        case 2:
            pullman_routes->add_comment_only(server_parser.get_route_name(), server_parser.get_comment());
            action_taken = "Added comment only";
            break;

        case 3:
            report = pullman_routes->safety_report();
            pullman_routes->print_new_report();
            action_taken = "made report";
            break;

        case 4:
            rating = pullman_routes->get_route_safety(server_parser.get_route_name(), server_parser.get_flag());
            action_taken = "Found Rating";
            break;

        case 5:
            pullman_routes->incriment_searched(server_parser.get_route_name());
            action_taken = "search incrimented";
            break;

        case 6:
            pullman_routes->incriment_walked(server_parser.get_route_name());
            action_taken = "walked incrimented";
            break;

        case 7:
            pullman_routes->clear_comments();
            action_taken = "Cleared Comments";
            break;

        case 8:
            pullman_routes->clear_walked(server_parser.get_route_name());
            action_taken = "Cleared times walked";
            break;

        case 9:
            pullman_routes->clear_searched(server_parser.get_route_name());
            action_taken = "Cleared Times Searched";
            break;

        case 10:
            run_tests();
            action_taken = "test report generated.";
            break;

        default:
            break;
        }

        //std::string response = action_taken + "</h1></html>";
        //serverMessage.append(std::to_string(response.size()));
        //serverMessage.append("\n\n");
        //serverMessage.append(response);

        // send response


        int bytesSent = 0;
        int totalBytesSent = 0;
        //while (totalBytesSent < serverMessage.size())
        //{
        //    bytesSent = send(new_wsocket, serverMessage.c_str(), serverMessage.size(), 0);
        //    if (bytesSent < 0)
        //    {
        //        std::cout << "could not send response" << std::endl;
        //    }
        //    totalBytesSent += bytesSent;
        //}
        while (totalBytesSent < action_taken.size())
        {
            bytesSent = send(new_wsocket, action_taken.c_str(), action_taken.size(), 0);
            if (bytesSent < 0)
            {
                std::cout << "could not send response" << std::endl;
            }
            totalBytesSent += bytesSent;
        }
        std::cout << "sent response to client" << std::endl;



        closesocket(new_wsocket);

    }

    closesocket(wsocket);
    WSACleanup();

    return 0;
}

void run_tests()
{
    RouteMap* pullman_routes = new RouteMap;
    pullman_routes->add_record("Fake Street", "Broken lamp at intersection", 2, 1);
    pullman_routes->add_record("Fake Street", "Broken lamp at intersection", 5, 0);
    pullman_routes->add_record("Fake Street", "sidwalk is lifitng up a bit", 1, -1);
    pullman_routes->add_record("Fake Street", "I tripped over the sidewalk, fix it", 2, 1);
    pullman_routes->incriment_walked("Fake Street");
    pullman_routes->incriment_walked("Fake Street");
    pullman_routes->incriment_walked("Fake Street");
    pullman_routes->incriment_searched("Fake Street");
    pullman_routes->incriment_searched("Fake Street");
    pullman_routes->add_record("Test Ave", "I lvoe the new sidwalk!", 5, 1);
    pullman_routes->add_record("Test Ave", "The new lamp post helps a lot, still could be brighter", 4, 2);
    pullman_routes->add_record("Test Ave", "much better now thank you", 5, 0);
    pullman_routes->add_record("Test Ave", "", 4, 1);
    pullman_routes->incriment_walked("Test Ave");
    pullman_routes->incriment_walked("Test Ave");
    pullman_routes->add_record("Test test", "ioeubg gewrou wgoeru", 2, 0);

    pullman_routes->print_new_report();

}