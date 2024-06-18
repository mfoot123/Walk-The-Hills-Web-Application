#include "Command_parser.h"


Command_Parser::Command_Parser(std::string line)
{
    this->valid_commands.push_back("get_all_comments");
    this->valid_commands.push_back("add_record");
    this->valid_commands.push_back("add_comment_only");
    this->valid_commands.push_back("safety_report");
    this->valid_commands.push_back("get_route_safety");
    this->valid_commands.push_back("increiment_searched");
    this->valid_commands.push_back("increiment_walked");
    this->valid_commands.push_back("clear_comments");
    this->valid_commands.push_back("clear_walked");
    this->valid_commands.push_back("clear_searched");
    this->valid_commands.push_back("run_tests");
    std::string valid_communication;
    if ((line.rfind("ADMIN_REQUEST:", 0) == 0) || (line.rfind("PHONE_REQUEST:", 0) == 0))
    { // pos=0 limits the search to the prefix
      // line starts with prefix
        valid_communication = line.substr(line.find(":") + 1);

        std::istringstream ss(valid_communication);
        std::string elem;
        std::vector<std::string> client_arguments;
        client_arguments.clear();
        client_arguments.shrink_to_fit();
        while (std::getline(ss, elem, '~'))
        {
            // ignore double delims and empty strings
            if (elem != "" || "~")
            {
                client_arguments.push_back(elem);
            }
        }

        if (client_arguments.size() == 5)
        {
            this->command = client_arguments[0];
            trim(this->command);
            this->command = str_tolower(this->command);
            this->route_name = client_arguments[1];
            trim(this->route_name);
            this->route_name = str_tolower(this->route_name);
            this->comment = client_arguments[2];
            trim(this->comment);
            this->rating = atoi(client_arguments[3].c_str());
            this->day_night_flag = atoi(client_arguments[4].c_str());
        }
        else
        {
            // improper formated communication, reject with invalid values
            reject();
        }
    }
    else
    {
        // improper formated communication, reject with invalid values
        reject();
    }
}

bool Command_Parser::has_argument()
{
    int size = this->command.length();
    for (int i = 0; i < size; i++)
    {
        if (this->command[i] == ' ')
        {
            if (this->command[i + 1] != ' ' || this->command[i + 1] != '\0')
            {
                return true;
            }
        }
    }
    return false;
}

int Command_Parser::find_cmd_index()
{
    for (int i = 0; i < this->valid_commands.size(); i++)
    {
        if (this->command.rfind(valid_commands[i], 0) == 0 )
        {
            return i;
        }
    }

    return -1;
}

std::string Command_Parser::get_command()
{
    return this->command;
}
std::string Command_Parser::get_route_name()
{
    return this->route_name;
}
std::string Command_Parser::get_comment()
{
    return this->comment;
}
int Command_Parser::get_rating()
{
    return this->rating;
}
int Command_Parser::get_flag()
{
    return this->day_night_flag;
}

inline void Command_Parser::trim(std::string& s)
{
    rtrim(s);
    ltrim(s);
}

void Command_Parser::reject()
{
    // improper formated communication, reject with invalid values
    this->rating = -1;
    this->day_night_flag = -1;
    this->command = "INVALID";
    this->route_name = "INVALID";
    this->comment = "INVALID";
}

inline void Command_Parser::ltrim(std::string& s)
{
    s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !std::isspace(ch);
        }));
}

inline void Command_Parser::rtrim(std::string& s)
{
    s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !std::isspace(ch);
        }).base(), s.end());
}

std::string Command_Parser::str_toupper(std::string s)
{
    std::transform(s.begin(), s.end(), s.begin(),
        [](unsigned char c) { return std::toupper(c); }
    );
    return s;
}

std::string Command_Parser::str_tolower(std::string s)
{
    std::transform(s.begin(), s.end(), s.begin(),
        [](unsigned char c) { return std::tolower(c); }
    );
    return s;
}