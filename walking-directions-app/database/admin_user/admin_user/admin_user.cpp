#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma comment(lib, "Ws2_32.lib")
#include <stdio.h>
#include <WinSock2.h>
#include <Ws2tcpip.h>
#include <iostream>
#include <string>
#include <algorithm> 
#include <cctype>
#include <locale>
#include <vector>

/// <summary>
/// Trims leading whitespace from the input string.
/// </summary>
/// <param name="s">The input string to be trimmed.</param>
inline void ltrim(std::string& s) {
    s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !std::isspace(ch);
        }));
}

/// <summary>
/// Trims trailing whitespace from the input string.
/// </summary>
/// <param name="s">The input string to be trimmed.</param>
inline void rtrim(std::string& s) {
    s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !std::isspace(ch);
        }).base(), s.end());
}

/// <summary>
/// Trims leading and trailing whitespace from the input string.
/// </summary>
/// <param name="s">The input string to be trimmed.</param>
inline void trim(std::string& s) {
    rtrim(s);
    ltrim(s);
}


/// <summary>
/// Establishes a socket connection.
/// </summary>
/// <returns>The established socket.</returns>
SOCKET establish_socket()
{
    SOCKET wsocket;
    SOCKET new_wsocket;
    WSADATA wsaData;

    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
    {
        std::cout << "could not initialize server";
    }

    // create a socket
    wsocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (wsocket == INVALID_SOCKET)
    {
        std::cout << "Could not create socket";
    }

    return wsocket;
}

/// <summary>
/// Communicates over a socket with the given request.
/// </summary>
/// <param name="request">The request to be sent over the socket.</param>
void communicate_over_socket(std::string request)
{
    SOCKET wsocket = establish_socket();
    struct sockaddr_in server;
    int server_len;

    // hard coding server information
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    server.sin_port = htons(8080);
    server_len = sizeof(server);

    // connect to the database server
    if (connect(wsocket, (SOCKADDR*)&server, server_len) != 0)
    {
        std::cout << "Could not connect to socket" << std::endl;
    }

    send(wsocket, request.c_str(), request.length(), 0);


    char buff[30720] = { 0 };
    int bytes = 0;
    bytes = recv(wsocket, buff, sizeof(buff), 0);
    if (bytes < 0)
    {
        std::cout << "Could not read client data" << std::endl;
    }
    std::cout << buff << std::endl;

    closesocket(wsocket);
    WSACleanup();
}

/// <summary>
/// Prints the menu options.
/// </summary>
void print_menu()
{
    std::cout << "*************************************************************" << std::endl;
    std::cout << "* Please enter a command from the below available commands: *" << std::endl;
    std::cout << "*-----------------------------------------------------------*" << std::endl;
    std::cout << "*     1. Request Report                                     *" << std::endl;
    std::cout << "*     2. Clear Comments from Database                       *" << std::endl;
    std::cout << "*     3. set times walked to 0  for all routs               *" << std::endl;
    std::cout << "*     4. set times searched to 0 for all routes             *" << std::endl;
    std::cout << "*     5. Exit Program                                       *" << std::endl;
    std::cout << "*************************************************************" << std::endl;
}

/// <summary>
/// Gets the user's choice from the menu options.
/// </summary>
/// <returns>The user's choice.</returns>
int get_choice()
{
    std::string option = "";
    int choice = 0;
    do
    {
        option.clear();
        std::getline(std::cin, option);
        try
        {
            choice = std::stoi(option);
        }
        catch (std::invalid_argument)
        {
            choice = 0;
        }
        catch (std::out_of_range)
        {
            choice = 0;
        }
        if ((choice < 1 || choice > 5) && (choice < 100))
        {
            std::cout << "Please enter a number between 1 and 5" << std::endl;
        }

    } while ((choice < 1 || choice > 5) && (choice < 100));

    return choice;
}

/// <summary>
/// Gets developer commands based on the user's choice.
/// </summary>
/// <param name="choice">The user's choice.</param>
/// <returns>The developer commands.</returns>
std::string get_developer_commands(int choice)
{
    std::string user_inputs[4];
    std::string user_input = "";

    
    switch (choice)
    {
    case 1: // print report
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 2: //clear comments
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 3: //clear times walked
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 4: //clear times searched
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 100: // developer entry, get all comments
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 101: // developer entry, add records
        std::cout << "Add Record: " << std::endl;
        std::cout << "What street? " << std::endl;
        std::getline(std::cin, user_inputs[0]);
        std::cout << "what comment? " << std::endl;
        std::getline(std::cin, user_inputs[1]);
        std::cout << "what rating? " << std::endl;
        std::getline(std::cin, user_inputs[2]);
        std::cout << "what flag? " << std::endl;
        std::getline(std::cin, user_inputs[3]);

        break;
    case 102: // developer entry, add_comment_only
        std::cout << "add_comment_only: " << std::endl;
        std::cout << "What street? " << std::endl;
        std::getline(std::cin, user_inputs[0]);
        std::cout << "what comment? " << std::endl;
        std::getline(std::cin, user_inputs[1]);
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 103: // developer entry, get_route_safety
        std::cout << "get_route_safety: " << std::endl;
        std::cout << "What street? " << std::endl;
        std::getline(std::cin, user_inputs[0]);
        std::cout << "what flag? " << std::endl;
        std::getline(std::cin, user_inputs[3]);
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        break;
    case 104: // developer entry, increiment_searched
        std::cout << "increiment_searched: " << std::endl;
        std::cout << "What street? " << std::endl;
        std::getline(std::cin, user_inputs[0]);
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 105: // developer entry, increiment_walked
        std::cout << "increiment_walked: " << std::endl;
        std::cout << "What street? " << std::endl;
        std::getline(std::cin, user_inputs[0]);
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
        break;
    case 106:
        user_inputs[0] = "SKIP";
        user_inputs[1] = "SKIP";
        user_inputs[2] = "6";
        user_inputs[3] = "6";
    default:
        break;
    }

    for (int i = 0; i < 4; i++)
    {
        
        if (user_inputs[i] != "")
        {
            trim(user_inputs[i]);
            if (user_inputs[i] != "")
            {
                // insert delim
                user_inputs[i] += "~";
                user_input += user_inputs[i];
            }
        }
    }

    return user_input;
}

/// <summary>
/// The main entry point of the program.
/// </summary>
/// <returns>Returns 0 upon successful execution.</returns>
int main()
{
    int choice = 0;
    SOCKET mySocket = establish_socket();
    std::string command = "";

    do
    {
        command.clear();
        print_menu();
        choice = get_choice();         
        switch (choice)
        {
        case 1: // print report
            command = "ADMIN_REQUEST:safety_report~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 2: //clear comments
            command = "ADMIN_REQUEST:clear_comments~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 3: //clear times walked
            command = "ADMIN_REQUEST:clear_walked~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 4: //clear times searched
            command = "ADMIN_REQUEST:clear_searched~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 100: // developer entry, get all comments
            command = "ADMIN_REQUEST:get_all_comments~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 101: // developer entry, add records
            command = "ADMIN_REQUEST:add_record~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 102: // developer entry, add_comment_only
            command = "ADMIN_REQUEST:add_comment_only~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 103: // developer entry, get_route_safety
            command = "ADMIN_REQUEST:get_route_safety~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 104: // developer entry, increiment_searched
            command = "ADMIN_REQUEST:increiment_searched~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 105: // developer entry, increiment_walked
            command = "ADMIN_REQUEST:increiment_walked~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;
        case 106: // developer entry, Run Tests
            command = "ADMIN_REQUEST:run_tests~";
            command += get_developer_commands(choice);
            communicate_over_socket(command);
            break;

        default:
            break;
        }
    } while (choice != 5);

    return 0;
}